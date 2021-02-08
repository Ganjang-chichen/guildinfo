// 코드 참고 : https://falsy.me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%9D%B4%EB%B2%88%EC%A3%BC-7%EC%9D%BC-%EA%B5%AC%ED%95%98%EA%B8%B0/

var currentDay = new Date();  
var theYear = currentDay.getFullYear();
var theMonth = currentDay.getMonth();
var theDate  = currentDay.getDate();
var theDayOfWeek = currentDay.getDay();
 

function getweek(pastnum) {
    var thisWeek = [];

    for(var i=0; i<7; i++) {
        var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek - (7 * pastnum)));
        var yyyy = resultDay.getFullYear();
        var mm = Number(resultDay.getMonth()) + 1;
        var dd = resultDay.getDate();
       
        mm = String(mm).length === 1 ? '0' + mm : mm;
        dd = String(dd).length === 1 ? '0' + dd : dd;
       
          thisWeek[i] = yyyy + '-' + mm + '-' + dd;
      }

      return thisWeek;
}
