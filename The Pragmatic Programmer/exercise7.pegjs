{
	function makeInteger(o) {
    	return parseInt(o.join(""), 10);
  	}
}

Time = hour:[1-12]+ period:Period {
		if (period === 'am') {
        	return ((makeInteger(hour) % 12) * 60);
        } else {
        	return (makeInteger(hour) * 60);
        }
    }
	/ hour:[1-12]+ ":" minute:[0-9]+ period:Period {
    	if (period === 'am') {
        	return ((makeInteger(hour) % 12) * 60) + makeInteger(minute);
        } else {
        	return (makeInteger(hour) * 60) + makeInteger(minute);
        }
      }
	/ hour:[0-9]+ ":" minute:[0-9]+ {
    	return (makeInteger(hour) * 60) + makeInteger(minute);
    };

/*Hour = "2" minutes:HTFDigit { return 20 + minutes;  }
	/ ten:HTen minutes:Digit { return ten + minutes; }
    / ten:Digit;*/

// Minute = ten:MTen digit:Digit { return (ten * 10) + digit };

Period = "am" / "pm";

// HTen = [0-1] { return parseInt(text(), 10) * 10; };

// HTFDigit = [0-3] { return parseInt(text(), 10); };

// MTen = [0-5] { return parseInt(text(), 10); };

/*Digit "digit"
  = _ [0-9] { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
  */