/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        this.bind();
    },
//    bind: function() {
//        document.addEventListener('deviceready', this.deviceready, false);
//    },
//    deviceready: function() {
//        // This is an event handler function, which means the scope is the event.
//        // So, we must explicitly called `app.report()` instead of `this.report()`.
//        app.report('deviceready');
//    },
    report: function(id) {
        // Report the event in the console
        console.log("Report: " + id);

        // Toggle the state from "pending" to "complete" for the reported ID.
        // Accomplished by adding .hide to the pending element and removing
        // .hide from the complete element.
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    },
    calcalc: function(element) {
        var ogInp = document.getElementById("og");
        var fgInp = document.getElementById("fg");
        var abvInp = document.getElementById("abv");
        var quantInp = document.getElementById("quantity");
        var calDiv = document.getElementById("calories");
        if(ogInp.value > 1.5)
            var brixMode = true;
        else
            var brixMode = false;

        if(brixMode)
        {
            var osg = (ogInp.value / (258.6-((ogInp.value / 258.2)*227.1))) + 1;
            var fsg = (fgInp.value / (258.6-((fgInp.value / 258.2)*227.1))) + 1;
        }
        else
        {
            var osg = ogInp.value;
            var fsg = fgInp.value;
        }
        if(element.id == "fg")
        {
            var abvVal = (osg - fsg) * 131.25;
            abvInp.value = abvVal;
        }
        if(element.id == "abv")
        {
            var fsg= osg - abvInp.value / 131.25;
            if(brixMode)
            {
                var brixVal = (((182.4601 * fsg - 775.6821) * fsg + 1262.7794) * fsg - 669.5622);
                fgInp.value = brixVal;
            }
            else
                fgInp.value = fsg;
        }
        if(brixMode)
        {
            var brixOG = ogInp.value;
            var brixFG = ogInp.value;
        }
        else
        {
            var brixOG = (((182.4601 * osg -775.6821) * osg +1262.7794) * osg -669.5622);
            var brixFG = (((182.4601 * fsg -775.6821) * fsg +1262.7794) * fsg -669.5622);
        }
        var abw = 0.79 * abvInp.value / fsg;
        var re = (0.1808 * brixOG) + (0.8192 * brixFG)
        var calPerOz = ((6.9 * abw) + 4 * (re - .1)) * fsg * 3.55 / 12;
        calDiv.innerText = Math.round(calPerOz * quantInp.value);
    }
};
