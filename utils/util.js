const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const errorSorry=function(params) {
  if(params!=''&&params!=null&&params!="null"&&params!=undefined&&params!="undefined"){
    return true;
  }else{
    return false;
  }
}

const formatDate=function(times) { 
  let now=new Date(times);
  var year=now.getFullYear(); 
  var month=now.getMonth()+1; 
  var date=now.getDate(); 
  var hour=now.getHours(); 
  var minute=now.getMinutes(); 
  var second=now.getSeconds(); 
  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
}
const getDateDiff=function(dateTimeStamp){
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;

  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  var result;
  var monthC =diffValue/month;
  var weekC =diffValue/(7*day);
  var dayC =diffValue/day;
  var hourC =diffValue/hour;
  var minC =diffValue/minute;
  if(hourC>=12){
       result = this.formatDate(dateTimeStamp);
       
   }
   else if(hourC>=1){
       result = parseInt(hourC) +"个小时前";
   }
   else if(minC>=1){
      result = parseInt(minC) +"分钟前";
   }else
       result = "刚刚发表";
  return result;
}
module.exports = {
  formatTime,
  errorSorry,
  formatDate,
  getDateDiff
}
