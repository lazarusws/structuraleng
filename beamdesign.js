//---------------------------------------------------------------------
var DL;                           //Dead load
var LL;                           //Live load
var DesignLoad;                   //Design load
var L;                            //beam length
var K                             //Compression steel coffcient 
var B                             //Width
var D                             //Depth
var Z                              //Lever arm
var As1                           //Bottom reinforcement 
var fcd                            //design concrete strength
var fyd                            //design steel strength
var selector
var selector1
var selector2
var n
var as1                             //Area of single bar 
var d                                // effective depth 

function designcalculation()
 {
	DL  = parseFloat( document.getElementById( "dl"  ).value );
	LL = parseFloat( document.getElementById( "ll" ).value );
	L  = parseFloat( document.getElementById( "l" ).value );
	D  = parseFloat( document.getElementById( "d" ).value );
	B  = parseFloat( document.getElementById( "b" ).value );


	selector = document.getElementById("ctype");
	fcd = selector[selector.selectedIndex].value;

	selector1 = document.getElementById("stype");
	fyd = selector1[selector1.selectedIndex].value;

	selector2 = document.getElementById("dtype");            //bar diameter  
	as1 = selector2[selector2.selectedIndex].value;


	d = D - 0.025 - (Math.sqrt((4 * as1)/ 3.14))/2000;         //effective depth = beam depth -  concrete cover - bar dia/2

	
DesignLoad =  1.35 * DL + 1.5 * LL;
DesignMoment = (DesignLoad * Math.pow(L,2))/8;




K = DesignMoment/( B * fcd * Math.pow(d,2));              //Change D in to effective depth 
Z = (d/2) * (1 + Math.sqrt(1-3.53 * K));                  //Change D in to effective depth



     
     As1 = DesignMoment * 1000000/(Z * fyd)              //Area in square mm 
     

n= As1/ as1

console.log(DesignLoad);
document.getElementById("dsl").innerHTML = precision( DesignLoad );

console.log(DesignMoment);
document.getElementById("dsm").innerHTML = precision( DesignMoment );

console.log(K);
document.getElementById("k").innerHTML = precision( K );

console.log(Z);
document.getElementById("z").innerHTML = precision( Z );

console.log(As1);
document.getElementById("as1").innerHTML = precision( As1 );

console.log(n);
document.getElementById("n").innerHTML = Math.ceil(n);
 }
//----------------------------------------------------------------------
