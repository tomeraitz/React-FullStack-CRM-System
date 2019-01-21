const moment = require('moment')

class Analytics{
    constructor(data){
        this.data = data
        this.bestSeller = []
        this.bestCountries = []
        this.salesOfLast30Days = []
        this.bestSellersObj = {}
        this.bestCountriesObj = {}
        this.pieUsers ={ data :[

            {
                name : "lastMonth",
                value : 0
            },
            
            {
                name : "last6Months",
                value : 0
            },
            {
                name : "lastYear",
                value : 0
            }
        ]}
        this.objCounterDays ={}
        this.date = {},
        this.newClients = 0,
        this.emails = 0,
        this.outstandingClients = 0
    }

    /// find by sold (genral)
    findBest(users , obj , prop){
        users.forEach(user =>{
            if(obj[user[prop]] && user.sold){
                obj[user[prop]].counter++
            }
        else if(obj[user[prop]] !== true && user.sold){
                obj[user[prop]] = {
                    name : user[prop],
                    counter : 1
                }
            }
        })
    }

    /// Genral filter
    filterGenral(arr , prop){
        this.data.filter(user => {
            if(user[prop]){
                arr.push(user)
            }
        })
        return arr.length
    }

    /// find top (genral)
    findTop(obj, top){
        let  newarr = Object.values(obj)
        newarr.sort(function (a, b) {
            return b.counter- a.counter  ;
        });
        newarr.splice(top)
        return newarr
    }

    findCurrentDate(){
        this.date = {
            month : moment().format('MMMM'),
            year : 2018,
            last30Days : moment().subtract(30, 'days').toArray().slice(0,3),
            last181Days : moment().subtract(181, 'days').toArray().slice(0,3),
            lastYear : moment().subtract(365, 'days').toArray().slice(0,3)
        }
    }

    //find current date (genral)
    firstContactDate(){
        let newClients = []
        this.data.filter(user =>{
            if(this.date.month === moment(user.firstContact).format('MMMM')
            && this.date.year === moment(user.firstContact).year()){
                newClients.push(user)
            }
        })
        this.newClients = newClients.length
    }

    findBestSellers(){
        this.findBest(this.data , this.bestSellersObj ,"owner")
        this.bestSeller  = this.findTop(this.bestSellersObj  ,3 )
    }

    findBestCountries(){
    this.findBest(this.data , this.bestCountriesObj, "country")
    this.bestCountries = this.findTop(this.bestCountriesObj  ,1)
    }

    findLastDate(){
        this.findCurrentDate()
        this.firstContactDate()
    }

    findEmailLast(){
        let arr = []
        this.emails = this.filterGenral(arr, "emailType")
    }

    findOutstandingClients(){
        let arr = []
        this.outstandingClients = this.filterGenral(arr, "sold")
    }

    salesSinceDate(){
        this.data.map(user => {
           let userArr =  moment(user.firstContact).toArray().slice(0,3)
                if(moment(userArr).diff(this.date.last30Days , "days") >= 0 && user.sold){
                    if(this.objCounterDays[moment(user.firstContact).format('MMM Do')] ){
                        this.objCounterDays[moment(user.firstContact).format('MMM Do')].counter++
                    }
                    else{
                        this.objCounterDays[moment(user.firstContact).format('MMM Do')] ={
                            dateForChart :  moment(user.firstContact).format('MMM Do'),
                            counter : 1,
                            dateSort :  moment(user.firstContact)}
                        this.salesOfLast30Days
                        .push(this.objCounterDays[moment(user.firstContact).format('MMM Do')] )
                    }
                    
                }
        })

        this.salesOfLast30Days.sort(function(a, b){
            return  moment(a.dateSort) - moment(b.dateSort)
          });
       
    }

    clientAcquisition(){
        this.data.map(user => {
            let userArr =  moment(user.firstContact).toArray().slice(0,3)
                 if(moment(userArr).diff(this.date.last30Days , "days") >= 0){
                     this.pieUsers.data[0].value++
                 }

                 else if(moment(userArr).diff(this.date.last181Days , "days") >= 0){
                    this.pieUsers.data[1].value++
                 }

                 else if(moment(userArr).diff(this.date.lastYear , "days") >= 0){
                    this.pieUsers.data[2].value++
                 }
         })
    }


    clerData(){
        this.data =[]
    }

}

module.exports = Analytics;