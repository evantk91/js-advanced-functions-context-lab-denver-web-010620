/* Your Code Here */
const createEmployeeRecord = function(row) {
   return {
      firstName: row[0],
      familyName: row[1],
      title: row[2],
      payPerHour: row[3],
      timeInEvents: [],
      timeOutEvents: []    
   }
}

const createEmployeeRecords = function(employeeRowData) {
   return employeeRowData.map(function(row) {
      return createEmployeeRecord(row)
   })
}

const createTimeInEvent = function(dateStamp) {
   let [date, hour] = dateStamp.split(' ');
 
   this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
   });
 
   return this;
}

const createTimeOutEvent = function(dateStamp) {
   let [date, hour] = dateStamp.split(' ');
 
   this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
   });
 
   return this;
}

const hoursWorkedOnDate = function(date) {
   const timeInEvent = this.timeInEvents.find(event => event.date === date);
   const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
   return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

const wagesEarnedOnDate = function(date) {
   const hoursWorked = hoursWorkedOnDate.call(this, date);
   return hoursWorked * this.payPerHour;
}

const findEmployeeByFirstName = function(srcArray, firstName) {
   return srcArray.find(record => {
      return record.firstName === firstName;
   })
}

const calculatePayroll = function(array) {
    return array.reduce((memo, record) => {
       return memo + allWagesFor.call(record)
    }, 0)
 }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}