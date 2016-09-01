'use strict';

/**

 * Countdown Clock module.
 * @author: Eugene Lai

 */

var CountdownClock = CountdownClock || {};
CountdownClock
= (function(window) {

  /**
 * Countdown Clock
 * @constructor
 * @param {string} domSelector - class or id selector of DOM element.
 * @param {string} endDate - endDate format: eg. 'September 01 2016' otherwise takes epoch time.
 */
  function CountdownClock( domSelector, endDate ) {
    this.domSelector = domSelector
    this.domElement  = (function() {
      var div = document.createElement('div')
      div.setAttribute('id', 'countdown-clock')
      return ( div )
    })()
    this.epoch       = false;
    this.endDate     = endDate;

    if ( ( String(endDate).match(/[0-9]{0,10}/)[0].length >= 10 ) ) {
      this.epoch = true;
      this.endDate = endDate * 1000
    }
  }

  CountdownClock.prototype = {
    constructor: CountdownClock,
    init: function() {
      var div,
          timeField, timeFieldLabel;
          console.log(this.domElement)
      for (var i = 0; i < 4; i ++) {
        div = document.createElement('div')
        div.setAttribute('class', 'countdown-clock-ticker')

        timeField = document.createElement('div')
        timeField.setAttribute('class', 'countdown-clock-ticker__field')
        div.appendChild(timeField)

        timeFieldLabel = document.createElement('div')
        timeFieldLabel.setAttribute('class', 'countdown-clock-ticker__field-label')
        div.appendChild(timeFieldLabel)

        this.domElement.appendChild(div)
      }

      this.domElement.setAttribute('class', 'countdown-clock')
      document.querySelector(this.domSelector).appendChild(this.domElement)

      return this
    },
    getTimeRemaining: function(endtime){
      var t = (function () {
        if ( this.epoch ) {
          return ( new Date(endtime) - new Date() )
        }
        else {
          return ( Date.parse(endtime) - Date.parse(new Date()) )
        }
      }.bind(this))()
      var seconds = Math.floor( (t/1000) % 60 );
      var minutes = Math.floor( (t/1000/60) % 60 );
      var hours = Math.floor( (t/(1000*60*60)) % 24 );
      var days = Math.floor( t/(1000*60*60*24) );
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    },
    setLabels: function() {
      var daysLabelHTML    = document.querySelectorAll('.countdown-clock-ticker__field-label')[0]
      var hoursLabelHTML   = document.querySelectorAll('.countdown-clock-ticker__field-label')[1]
      var minutesLabelHTML = document.querySelectorAll('.countdown-clock-ticker__field-label')[2]
      var secondsLabelHTML = document.querySelectorAll('.countdown-clock-ticker__field-label')[3]
      daysLabelHTML.innerText = 'days'
      hoursLabelHTML.innerText = 'hours'
      minutesLabelHTML.innerText = 'minutes'
      secondsLabelHTML.innerText = 'seconds'

      return this
    },
    tick: function() {
      this.daysHTML    = document.querySelectorAll('.countdown-clock-ticker__field')[0]
      this.hoursHTML   = document.querySelectorAll('.countdown-clock-ticker__field')[1]
      this.minutesHTML = document.querySelectorAll('.countdown-clock-ticker__field')[2]
      this.secondsHTML = document.querySelectorAll('.countdown-clock-ticker__field')[3]
      setInterval(function() {
        this.daysHTML.innerText = this.getTimeRemaining( new Date(this.endDate) ).days
        this.hoursHTML.innerText = this.getTimeRemaining( new Date(this.endDate) ).hours
        this.minutesHTML.innerText = this.getTimeRemaining( new Date(this.endDate) ).minutes
        this.secondsHTML.innerText = this.getTimeRemaining( new Date(this.endDate) ).seconds
      }.bind(this), 1000)

      return this
    }
  }

  return CountdownClock

})(window);


/* Execute */
var clock

clock = new CountdownClock('.clock', 'September 12 2016')
clock.init()
     .tick()
     .setLabels()
