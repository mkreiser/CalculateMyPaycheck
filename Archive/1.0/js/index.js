var permanentStorage = window.localStorage;
var tempStorage = window.sessionStorage;

angular.module('ionicApp', ['ionic'])

if(window.localStorage.getItem("fedTaxRate") === null){
    window.localStorage.setItem("fedTaxRate", 6.75);
}

if(window.localStorage.getItem("stateRate") === null){
    window.localStorage.setItem("stateRate", 1.4);
}

if(window.localStorage.getItem("localRate") === null){
    window.localStorage.setItem("localRate", 2.78);
}

if(window.localStorage.getItem("ssRate") === null){
    window.localStorage.setItem("ssRate", 0);
}

if(window.localStorage.getItem("medRate") === null){
    window.localStorage.setItem("medRate", 1.6);
}

if(window.localStorage.getItem("retirementRate") === null){
    window.localStorage.setItem("retirementRate", 10);
}

if(window.localStorage.getItem("otherRate") === null){
    window.localStorage.setItem("otherRate", 0);
}

if(window.localStorage.getItem("otherAm") === null){
    window.localStorage.setItem("otherAm", 0);
}

$(document).ready(function(){
    $('#settings').hide();
    $('#content').show();

    $('.cardHead').on('click',function(){
        window.open("https://play.google.com/store/apps/details?id=com.mikekreiser.CalculateMyPayCheck");
    });

    $('#settingsButton').on('click', function(){

        if($('#content').is(':visible'))
        {
            setValues();
            $('#content').hide();
            $('#settings').show();
        }

        else if($('#settings').is(':visible')){
            saveSettings();
            $('#settings').hide();
            $('#content').show();
        }
    });
});


$('.cardHead2').on('click',function(){
    var hourlyPay = parseFloat($('#hoursWage').val());
    var hoursWorked = parseFloat($('#hoursWorked').val());

    var federalTax = window.localStorage.getItem("fedTaxRate");
    var stateTax = window.localStorage.getItem("stateRate");
    var localTax = window.localStorage.getItem("localRate");
    var ssTax = window.localStorage.getItem("ssRate");
    var medTax = window.localStorage.getItem("medRate");
    var retireRate = window.localStorage.getItem("retirementRate");

    var otherRate = window.localStorage.getItem("otherRate");
    var otherAm = window.localStorage.getItem("otherAm");

    var totalPay = hourlyPay * hoursWorked;
    var retireDec = totalPay * (retireRate / 100);
    var taxablePay = totalPay - retireDec;

    var fedTaxVar = taxablePay * (federalTax/100);
    var stateTaxVar = taxablePay * (stateTax/100);
    var localTaxVar = taxablePay * (localTax/100);
    var ssTaxVar = taxablePay * (ssTax/100);
    var medTaxVar = taxablePay * (medTax/100);

    var otherRateVar = taxablePay * (otherRate/100);
    var otherTotal = 0;
    otherTotal = parseFloat(otherRateVar) + parseFloat(otherAm);

    var taxDec = fedTaxVar + stateTaxVar + localTaxVar + ssTaxVar + medTaxVar;
    
    var endPay = totalPay - taxDec - retireDec - otherRateVar - otherAm;
console.log(endPay);
    $('#totalPay').html('$' + roundToTwo(totalPay));
    $('#taxForm').html('$' + roundToTwo(taxDec));
    $('#retireForm').html('$' + roundToTwo(retireDec));
    $('#miscForm').html('$' + roundToTwo(otherTotal));
    $('#endTotal').html('$' + roundToTwo(endPay));
});

function setValues(){
    $('#fedRate').val(window.localStorage.getItem('fedTaxRate'));
    $('#stateRate').val(window.localStorage.getItem('stateRate'));
    $('#localRate').val(window.localStorage.getItem('localRate'));
    $('#ssRate').val(window.localStorage.getItem('ssRate'));
    $('#medRate').val(window.localStorage.getItem('medRate'));
    $('#retireRate').val(window.localStorage.getItem('retirementRate'));
    $('#otherRate').val(window.localStorage.getItem('otherRate'));
    $('#otherAm').val(window.localStorage.getItem('otherAm'));
}

function saveSettings(){
    window.localStorage.setItem('fedTaxRate', parseFloat($('#fedRate').val()));
    window.localStorage.setItem('stateRate', parseFloat($('#stateRate').val()));
    window.localStorage.setItem('localRate', parseFloat($('#localRate').val()));
    window.localStorage.setItem('ssRate', parseFloat($('#ssRate').val()));
    window.localStorage.setItem('medRate', parseFloat($('#medRate').val()));
    window.localStorage.setItem('retirementRate', parseFloat($('#retireRate').val()));
    window.localStorage.setItem('otherRate', parseFloat($('#otherRate').val()));
    window.localStorage.setItem('otherAm', parseFloat($('#otherAm').val()));
}



//Rounding
function roundToTwo(num) { return +(Math.round(num + "e+2")  + "e-2"); }
function roundToThree(num) { return +(Math.round(num + "e+3")  + "e-3"); }
function roundToSix(num) { return +(Math.round(num + "e+6")  + "e-6"); }
function roundToEight(num) { return +(Math.round(num + "e+8")  + "e-8"); }

function pageLoad() {
    document.getElementById('cashLogo').style.left = 0;
    document.getElementById('cashLogo').style.right = 0;
}