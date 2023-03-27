library(readxl)
library(dplyr)
library(xgboost)
library(forecast)
library(ROCR)
library(zoo)
library(ggplot2)

set.seed(123) # for reproducibility
data <- read_excel("2023-student-research-hazard-event-data.xlsx")
options(scipen = 999) 

colnames(data) <- c(
  "region", 
  "hazard_event", 
  "quarter", 
  "Year", 
  "duration", 
  "fatalities", 
  "injuries", 
  "property_damage"
  )
# Convert hazard event to categorical event
data$hazard_event <- as.factor(data$hazard_event)
# Convert into numbers
data$hazard_event <- as.numeric(data$hazard_event)
# Gamma cannot have zero value
data[data == 0] <- 0.001


# Inflation data:
eco_dem_data <- read_excel("2023-student-research-eco-dem-data.xlsx", sheet = "Inflation-Interest")

# Maybe Remove NA's and Outliers
eco_dem_data = eco_dem_data[-c(42), ]
eco_dem_data = na.omit(eco_dem_data)

# Graphs to see relationship
plot(eco_dem_data$Year, eco_dem_data$Inflation, type = 'l', lwd = 3, ylim = c(0, 0.2))
lines(eco_dem_data$Year, eco_dem_data$`Government Overnight Bank Lending Rate`, col = 'red')
lines(eco_dem_data$Year, eco_dem_data$`1-yr risk free rate`, col = 'green')
lines(eco_dem_data$Year, eco_dem_data$`10-yr risk free rate`, col = 'blue')

# Make the time series
TS <- ts(eco_dem_data$Inflation, start = eco_dem_data$Year[1], frequency = 1)

# Moving Average (IT WORKS)
MA2 <- ma(eco_dem_data$Inflation, order = 5, centre = TRUE)
MA2
forecastMA2 <- forecast(MA2, h = 10)
forecastMA2
plot(forecastMA2, main = 'Inflation Forecast', xlab = 'Time', ylab = 'Inflation')
accuracy(forecastMA2)



# Keven's Code:
demodata <- read_excel("2023-student-research-eco-dem-data.xlsx", 2)

#Projection of population for the next 10 years
poptable <- demodata[c(9,8,7),]

colnames(poptable) <- demodata[6,]

#Changing columns to numeric
poptable$'Region 1'<- as.numeric(poptable$'Region 1')
poptable$'Region 2'<- as.numeric(poptable$'Region 2')
poptable$'Region 3'<- as.numeric(poptable$'Region 3')
poptable$'Region 4'<- as.numeric(poptable$'Region 4')
poptable$'Region 5'<- as.numeric(poptable$'Region 5')
poptable$'Region 6'<- as.numeric(poptable$'Region 6')

#Average population growth rate over 2019-2021 period
growth <- c(0,0,0,0,0,0)
for (i in 2:7){
  print(i)
  ave <- mean(c(as.numeric(poptable[2,i]/poptable[1,i]),as.numeric(poptable[3,i]/poptable[2,i])))
  print(ave)
  growth[i-1] <- ave
}

#Projecting next 10 years using found growth rates
popproj <- data.frame()

#Region
for (i in (1:6)){
  #year 1 projection
  popproj[1,i] <- poptable[3,i+1]*growth[i]
  #year 2-10 projection
  for (j in (2:10)){
    popproj[j,i] <- popproj[j-1,i]*growth[i]
  } 
}

#Property value distribution
pvd <-demodata[c(37:49),]
colnames(pvd) <- demodata[6,]
pvd$'Region 1'<- as.numeric(pvd$'Region 1')
pvd$'Region 2'<- as.numeric(pvd$'Region 2')
pvd$'Region 3'<- as.numeric(pvd$'Region 3')
pvd$'Region 4'<- as.numeric(pvd$'Region 4')
pvd$'Region 5'<- as.numeric(pvd$'Region 5')
pvd$'Region 6'<- as.numeric(pvd$'Region 6')

#Replacing first column with average value
firstcolumn <-c(25000,75000,125000,175000,225000,275000,350000,450000,625000,875000,1250000,1750000,2000000)
pvd[,1] <- firstcolumn


#Expected property value
pvd1 <- data.frame()

for (i in (1:6)){
  for (j in (1:13)){
    pvd1[j,i] <- pvd[j,1]*pvd[j,i+1] 
  }
}

epv <- c()
for (i in (1:6)){
  epv[i] <- sum(pvd1[,i])  
}

#In order from lowest to highest expected property value: Region 4,5,6,3,2,1

#Household goods value ranges from 5-10% of property value
hhgoodsval <- epv*0.05


#Accommodation costs
#With the assumptions that accommodation is only sourced for 3 weeks after claim, and the found accommodation is based on property value to replicate "quality of life"
weeka <- 3
accomval <- epv*0.001*weeka
#Modelling with inflation


#Psychological impacts
#With the assumption that psychological treatment is only sourced for 5 weeks after claim
weekb <- 5
psychoval <- epv*0.00075*weekb
#Modelling with inflation


#Combined insured amount (pre-inflation)
insured <- hhgoodsval + accomval + psychoval

#Combined insured amount (post-inflation) for the next 10 years
#using a loop that creates 10 lines using insured + inflation

#Probability of claims over the next 10 years


#Claim cost prediction
#post inflation x probability of claim


#voluntary vs involuntary displacement
# maybe additional expected cost for involuntary displacement

# Add inflation to data:
data <- left_join(data, eco_dem_data, by = "Year", multiple = "all")
colnames(data) <- c(
  "region", 
  "hazard_event", 
  "quarter", 
  "Year", 
  "duration", 
  "fatalities", 
  "injuries", 
  "property_damage",
  "inflation",
  "bank_rate",
  "one_year_risk_rate",
  "ten_year_risk_rate"
)


# Sampling for GLM with gamma link:
sample <- sample(c(TRUE, FALSE), nrow(data), replace=TRUE, prob=c(0.7,0.3))

train <- data[sample, ]
# train %>% count(region)

x_train <- as.matrix(subset(train, select = -c(property_damage)))
y_train <- as.matrix(subset(train, select = c(property_damage)))

test <- data[!sample, ]
x_test <- as.matrix(subset(test, select = -c(property_damage)))
y_test <- as.matrix(subset(test, select = c(property_damage)))
# test %>% count(region)

gamma_param <- list(
  objective = "reg:gamma",
  gamma = 1,
  max_depth = 20,
  eta = 0.5
)

xgb_model <- xgboost(
  data = x_train,
  label = y_train,
  params = gamma_param,
  nrounds = 100
)

summary(xgb_model)

# make predictions on the test set
y_pred <- predict(xgb_model, x_test)

calc_mse <- function(predicted, actual) {
  print(length(actual))
  return(sum((actual - predicted)^2) / length(actual))
}

# Max depth 3: 6.208e+16
# Max depth 20: 5.765571e+16
print(calc_mse(y_pred, y_test))

# Graphs:
# Plot prediction distribution
plot(density(y_pred), main = "Prediction Distribution", xlab = "Predicted Value")
lines(density(y_test), col = "red")
legend("topright", legend = c("Predicted", "Actual"), col = c("black", "red"), lty = 1)

# Feature importance
# Plot feature importance
xgb.plot.importance(importance_matrix = 
                      xgb.importance(feature_names = names(x_train), model = xgb_model),
                      main = "Importance Feature")




########################## Testing 10 year basis model ######################### 
data10 <- read_excel("Dickson/hazard-frequency-model.xlsx", sheet = "Decade Data")
colnames(data10) <- c("Decade", "YStart", "YEnd", "Region", "Invol_Disp", "Duration", "Fatalities", "Injuries", "property_damage")

make_data_num <- function(data) {
  data$Region <- as.numeric(data$Region)
  data$Fatalities <- as.numeric(data$Fatalities)
  data$Duration <- as.numeric(data$Duration)
  data$Injuries <- as.numeric(data$Injuries)
  data$property_damage <- as.numeric(data$property_damage)
  data$Invol_Disp <- as.numeric(data$Invol_Disp)
  
  return(data)
  
}

data10 <- make_data_num(data10)
data10$Decade <- as.numeric(data10$Decade)

data10[data10 == 0] <- 0.001

# Sampling for GLM with gamma link:
sample10 <- sample(c(TRUE, FALSE), nrow(data10), replace=TRUE, prob=c(0.7,0.3))

train10 <- data10[sample10, ]
# train %>% count(region)

x_train10 <- as.matrix(subset(train10, select = -c(YStart, YEnd, property_damage)))
y_train10 <- as.matrix(subset(train10, select = c(property_damage)))

test10 <- data10[!sample10, ]
x_test10 <- as.matrix(subset(test10, select = -c(YStart, YEnd, property_damage)))
y_test10 <- as.matrix(subset(test10, select = c(property_damage)))
# test %>% count(region)

gamma_param <- list(
  objective = "reg:gamma",
  gamma = 1,
  max_depth = 20,
  eta = 0.5
)

xgb_model10 <- xgboost(
  data = x_train10,
  label = y_train10,
  params = gamma_param,
  nrounds = 100
)

summary(xgb_model10)

# make predictions on the test set
y_pred10 <- predict(xgb_model10, x_test10)

calc_mse <- function(predicted, actual) {
  print(length(actual))
  return(sum((actual - predicted)^2) / length(actual))
}

# Max depth 3: 6.208e+16
# Max depth 20: 7.81e+15
print(calc_mse(y_pred10, y_test10))


#################################### Yearly####################################
data_yearly <- read_excel("Dickson/hazard-frequency-model.xlsx", sheet = "Yearly Data")
colnames(data_yearly) <- c("Year","Region", "Invol_Disp", "Duration", "Fatalities", "Injuries", "property_damage")

data_yearly <- make_data_num(data_yearly)
data_yearly$Year <- as.numeric(data_yearly$Year)

region1 <- data_yearly %>% filter(Region == 1)
region2 <- data_yearly %>% filter(Region == 2)
region3 <- data_yearly %>% filter(Region == 3)
region4 <- data_yearly %>% filter(Region == 4)
region5 <- data_yearly %>% filter(Region == 5)
region6 <- data_yearly %>% filter(Region == 6)


projections <- function(in_data, start) {
  # Projections 
  
  proj <- ts(in_data, start , frequency = 1)
  
  # Moving Average (IT WORKS)
  proj_ma2 <- ma(proj, order = 5, centre = TRUE)
  proj_forecast2 <- forecast(proj_ma2, h = 10)
  print(proj_forecast2)
  # accuracy(proj_forecast2)
}

# Projections for Duration

r1_dur <- projections(region1$Duration, region1$Year[1])
r1_dur['Year'] <- c(2021:2030)
colnames(r1_dur)[1] = "Duration"
r1_dur <- select(r1_dur, c('Year', 'Duration'))

r2_dur <- projections(region2$Duration, region1$Year[1])
r2_dur['Year'] <- c(2021:2030)
colnames(r2_dur)[1] = "Duration"
r2_dur <- select(r2_dur, c('Year', 'Duration'))

r3_dur <- projections(region3$Duration, region1$Year[1])
r3_dur['Year'] <- c(2021:2030)
colnames(r3_dur)[1] = "Duration"
r3_dur <- select(r3_dur, c('Year', 'Duration'))

r4_dur <- projections(region4$Duration, region1$Year[1])
r4_dur['Year'] <- c(2021:2030)
colnames(r4_dur)[1] = "Duration"
r4_dur <- select(r4_dur, c('Year', 'Duration'))

r5_dur <- projections(region5$Duration, region1$Year[1])
r5_dur['Year'] <- c(2021:2030)
colnames(r5_dur)[1] = "Duration"
r5_dur <- select(r5_dur, c('Year', 'Duration'))

r6_dur <- projections(region6$Duration, region1$Year[1])
r6_dur['Year'] <- c(2021:2030)
colnames(r6_dur)[1] = "Duration"
r6_dur <- select(r6_dur, c('Year', 'Duration'))

# Projections for Fatalities
r1_fat <- projections(region1$Fatalities, region1$Year[1])
r1_fat['Year'] <- c(2021:2030)
colnames(r1_fat)[1] = "Fatalities"
r1_fat <- select(r1_fat, c('Year', 'Fatalities'))

r2_fat <- projections(region2$Fatalities, region1$Year[1])
r2_fat['Year'] <- c(2021:2030)
colnames(r2_fat)[1] = "Fatalities"
r2_fat <- select(r2_fat, c('Year', 'Fatalities'))

r3_fat <- projections(region3$Fatalities, region1$Year[1])
r3_fat['Year'] <- c(2021:2030)
colnames(r3_fat)[1] = "Fatalities"
r3_fat <- select(r3_fat, c('Year', 'Fatalities'))

r4_fat <- projections(region4$Fatalities, region1$Year[1])
r4_fat['Year'] <- c(2021:2030)
colnames(r4_fat)[1] = "Fatalities"
r4_fat <- select(r4_fat, c('Year', 'Fatalities'))

r5_fat <- projections(region5$Fatalities, region1$Year[1])
r5_fat['Year'] <- c(2021:2030)
colnames(r5_fat)[1] = "Fatalities"
r5_fat <- select(r5_fat, c('Year', 'Fatalities'))
 
r6_fat <- projections(region6$Fatalities, region1$Year[1])
r6_fat['Year'] <- c(2021:2030)
colnames(r6_fat)[1] = "Fatalities"
r6_fat <- select(r6_fat, c('Year', 'Fatalities'))

# Projections for Injuries
r1_inj <- projections(region1$Injuries, region1$Year[1])
r1_inj['Year'] <- c(2021:2030)
colnames(r1_inj)[1] = "Injuries"
r1_inj <- select(r1_inj, c('Year', 'Injuries'))

r2_inj <- projections(region2$Injuries, region1$Year[1])
r2_inj['Year'] <- c(2021:2030)
colnames(r2_inj)[1] = "Injuries"
r2_inj <- select(r2_inj, c('Year', 'Injuries'))

r3_inj <- projections(region3$Injuries, region1$Year[1])
r3_inj['Year'] <- c(2021:2030)
colnames(r3_inj)[1] = "Injuries"
r3_inj <- select(r3_inj, c('Year', 'Injuries'))

r4_inj <- projections(region4$Injuries, region1$Year[1])
r4_inj['Year'] <- c(2021:2030)
colnames(r4_inj)[1] = "Injuries"
r4_inj <- select(r4_inj, c('Year', 'Injuries'))

r5_inj <- projections(region5$Injuries, region1$Year[1])
r5_inj['Year'] <- c(2021:2030)
colnames(r5_inj)[1] = "Injuries"
r5_inj <- select(r5_inj, c('Year', 'Injuries'))

r6_inj <- projections(region6$Injuries, region1$Year[1])
r6_inj['Year'] <- c(2021:2030)
colnames(r6_inj)[1] = "Injuries"
r6_inj <- select(r6_inj, c('Year', 'Injuries'))


r1 <- r1_dur %>% left_join(r1_fat, by = 'Year') %>% left_join(r1_inj, by = 'Year')
r2 <- r2_dur %>% left_join(r2_fat, by = 'Year') %>% left_join(r2_inj, by = 'Year')
r3 <- r3_dur %>% left_join(r3_fat, by = 'Year') %>% left_join(r3_inj, by = 'Year')
r4 <- r4_dur %>% left_join(r4_fat, by = 'Year') %>% left_join(r4_inj, by = 'Year')
r5 <- r5_dur %>% left_join(r5_fat, by = 'Year') %>% left_join(r5_inj, by = 'Year')
r6 <- r6_dur %>% left_join(r6_fat, by = 'Year') %>% left_join(r6_inj, by = 'Year')

r1 <- r1 %>% mutate(Invol_Disp = 1) %>% mutate(Region = 1) %>% mutate(property_damage = NA)
r2 <- r2 %>% mutate(Invol_Disp = 1) %>% mutate(Region = 2) %>% mutate(property_damage = NA)
r3 <- r3 %>% mutate(Invol_Disp = 1) %>% mutate(Region = 3) %>% mutate(property_damage = NA)
r4 <- r4 %>% mutate(Invol_Disp = 1) %>% mutate(Region = 4) %>% mutate(property_damage = NA)
r5 <- r5 %>% mutate(Invol_Disp = 1) %>% mutate(Region = 5) %>% mutate(property_damage = NA)
r6 <- r6 %>% mutate(Invol_Disp = 1) %>% mutate(Region = 6) %>% mutate(property_damage = NA)

data_proj <- data_yearly %>% 
  rows_append(r1) %>% 
  rows_append(r2) %>% 
  rows_append(r3) %>%
  rows_append(r4) %>%
  rows_append(r5) %>%
  rows_append(r6) 

data_proj[data_proj == 0] <- 0.001
finalTrain <- data_proj %>% filter(Year <= 2020)
finalTest <- data_proj %>% filter(Year > 2020)


Fxtrain <- as.matrix(subset(finalTrain, select = -c(property_damage)))
Fytrain <- as.matrix(subset(finalTrain, select = c(property_damage)))


Fxtest <- as.matrix(subset(finalTest, select = -c(property_damage)))
Fytest <- as.matrix(subset(finalTest, select = c(property_damage)))

gamma_param <- list(
  objective = "reg:gamma",
  gamma = 1,
  max_depth = 20,
  eta = 0.5
)

Fxgb_model <- xgboost(
  data = Fxtrain,
  label = Fytrain,
  params = gamma_param,
  nrounds = 100
)

summary(Fxgb_model)

# make predictions on the test set
Fy_pred <- predict(Fxgb_model, Fxtest)
finalTest$property_damage <- Fy_pred


region1Final <- finalTest %>% filter(Region == 1)
region2Final <- finalTest %>% filter(Region == 2)
region3Final <- finalTest %>% filter(Region == 3)
region4Final <- finalTest %>% filter(Region == 4)
region5Final <- finalTest %>% filter(Region == 5)
region6Final <- finalTest %>% filter(Region == 6)


plot(region1Final$Year, region1Final$property_damage, type = 'l', ylim = c(0,35000000), ylab = 'Property Damage', xlab = 'Year', main = 'Severity')
lines(region2Final$Year, region2Final$property_damage, type = 'l', col = 'green')
lines(region3Final$Year, region3Final$property_damage, type = 'l', col = 'red')
lines(region4Final$Year, region4Final$property_damage, type = 'l', col = 'blue')
lines(region5Final$Year, region5Final$property_damage, type = 'l', col = 'purple')
lines(region6Final$Year, region6Final$property_damage, type = 'l', col = 'orange')
legend(2022, 32500000, legend = c("Region 1","Region 2", "Region 3", "Region 4", "Region 5", "Region 6"), col=c("black","green", "red", "blue","purple", "orange"), 
       lty=1, cex=0.8)

plot(region1Final$Year, region1Final$property_damage, type = 'l', ylim = c(0,50000), ylab = 'Property Damage', xlab = 'Year', main = 'Severity')
lines(region4Final$Year, region4Final$property_damage, type = 'l', col = 'blue')
lines(region5Final$Year, region5Final$property_damage, type = 'l', col = 'purple')
lines(region6Final$Year, region6Final$property_damage, type = 'l', col = 'orange')
legend(2022, 45000, legend = c("Region 4", "Region 5", "Region 6"), col=c("blue","purple", "orange"), 
       lty=1, cex=0.8)

### Quantile Regression Model ###
## Confidence Interval ##
# Frequency # 

freq <- read_excel("Dickson/hazard-frequency-model.xlsx", sheet = "Yearly Frequency")

FINALdf <- merge(finalTest, freq)
FINALdf <- FINALdf %>% mutate(avgClaim = property_damage * Frequency)

# plot(FINALdf$Year, FINALdf$avgClaim, type = 'l', lwd = 2, ylab = 'Claim Cost', xlab = 'Year', main = 'Average Claim Cost')

# Split graph to regions
r1claim <- FINALdf %>% filter(Region == 1)
r2claim <- FINALdf %>% filter(Region == 2)
r3claim <- FINALdf %>% filter(Region == 3)
r4claim <- FINALdf %>% filter(Region == 4)
r5claim <- FINALdf %>% filter(Region == 5)
r6claim <- FINALdf %>% filter(Region == 6)

plot(r1claim$Year, r1claim$avgClaim, type = 'l', ylab = 'Claim Cost', xlab = 'Year', main = 'Average Claim Cost', ylim = c(0,1400000000))
lines(r2claim$Year, r2claim$avgClaim, type = 'l', col = 'green')
lines(r3claim$Year, r3claim$avgClaim, type = 'l', col = 'red')
lines(r4claim$Year, r4claim$avgClaim, type = 'l', col = 'blue')
lines(r5claim$Year, r5claim$avgClaim, type = 'l', col = 'purple')
lines(r6claim$Year, r6claim$avgClaim, type = 'l', col = 'orange')
legend(2022, 1000000000, legend = c("Region 1","Region 2", "Region 3", "Region 4", "Region 5", "Region 6"), col=c("black","green", "red", "blue","purple", "orange"), 
       lty=1, cex=0.8)

