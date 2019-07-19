function input(){

    //Value input
    var DL = parseFloat( document.getElementById( "deadLoad"  ).value );
    var LL = parseFloat( document.getElementById( "liveLoad" ).value );
    var l  = parseFloat( document.getElementById( "length" ).value );
    var D  = parseFloat( document.getElementById( "depth" ).value );
    var b  = parseFloat( document.getElementById( "breadth" ).value );

    var safetyDeadLoad = parseFloat( document.getElementById( "sfTypeDeadload" ).value );
    var safetyLiveLoad = parseFloat( document.getElementById( "sfTypeLiveload" ).value );
    //selector input
    var	selectorSteelGrade = document.getElementById("steelType");
    var	fyd = selectorSteelGrade[selectorSteelGrade.selectedIndex].value;

    var	selectorConcreteGrade = document.getElementById("barDiaType"); 
    var	bar_as_mm = selectorConcreteGrade[selectorConcreteGrade.selectedIndex].value;
    

    var	selectorBarDiameter = document.getElementById("concreteType"); 
    var	fck = selectorBarDiameter[selectorBarDiameter.selectedIndex].value;

    var	selectorMomentRedistribution = document.getElementById("momentdist"); 
    var	mom_dis = selectorMomentRedistribution[selectorMomentRedistribution.selectedIndex].value;


    var d1 = D - 0.025 - (Math.sqrt((4 * bar_as_mm)/ 3.14))/2000;         //effective depth = beam depth -  concrete cover - bar dia/2

    var d2 = d1 - 0.025 - (Math.sqrt((4 * bar_as_mm)/ 3.14))/2000; 

    console.log(d1);
    document.getElementById("effectiveDepth").innerHTML = precision(d1);

	return {DL, LL, l, D, b, bar_as_mm, fyd, fck, mom_dis, d1, d2, safetyDeadLoad, safetyLiveLoad};

}

function designloadAndMoment() {

    var {DL,LL, safetyLiveLoad, safetyDeadLoad, l} = input()

    var DesignLoad =  safetyDeadLoad * DL + safetyLiveLoad* LL;
    
    var DesignMoment = (DesignLoad * l * l) / 8;
    
    console.log(DesignLoad);
    document.getElementById("designLoad").innerHTML = precision( DesignLoad );
    
    console.log(DesignMoment);
    document.getElementById("designMoment").innerHTML = precision( DesignMoment );


    return {DesignLoad, DesignMoment};
}
function under_reinforcement_check() {

    var {mom_dis, d1, b, fck} = input();
    
    var {DesignMoment} = designloadAndMoment();

    var k_prime = 0.6 * mom_dis - 0.18 * mom_dis * mom_dis - 0.21;

    var k = DesignMoment/ (b * (fck/1.5) * d1 * d1);   

    

    if (k >= 1 / 3.53 ) {

        

            alert("Brittle failure, increase the section capacity by either increasing the depth or the concrete grade!");
    }else { k = DesignMoment/ (b * (fck/1.5) * d1 * d1) }

    
    
    console.log(k);
    document.getElementById("reinfCoffi").innerHTML = precision(k);

    console.log(k_prime);
    document.getElementById("underReinforced").innerHTML = precision(k_prime);

    return{k, k_prime};

}

function flexure_design() {

    var {d1, d2,k,b,fck, k_prime, fyd, bar_as_mm, mom_dis} = input();

    var {DesignMoment} = designloadAndMoment();

    var {k, k_prime} = under_reinforcement_check();
    
    if (k <= k_prime) {

        var z = Math.min((d1/2) * (1 + Math.sqrt(1 - 3.53 * k)), 0.95 * d1);   

        var As1 = DesignMoment * 1000000/(z * fyd);              //Area in square mm      

        var n1= Math.max(As1 / bar_as_mm, 2);                    //No of bar in tension zone
        
        var As2 = 0;

        var n2 = 0;

        var status = "Singly reinforced beam"

    } else{

        var z = Math.min((d1/2) * (1 + Math.sqrt(1 - 3.53 * k)), 0.95 * d1);   

        var As1 = DesignMoment * 1000000/(z * fyd);              //Area in square mm      

        var n1= Math.max(As1 / bar_as_mm, 2);  

        var M_prime = k_prime * b * d1 * d1 * fck; 

        var Xu = (mom_dis - 0.4) * d1;

        var fsc = Math.min((700 * (Xu - d2)) / Xu , fyd);

        var As2 = (DesignMoment - M_prime ) / (fsc * (d1 - d2));

        var n2 = As2 / bar_as_mm;

        var status = "Doubly reinforced beam"

    }

    
   
    console.log(As1);
    document.getElementById("as1").innerHTML = precision(As1);

    console.log(As2);
    document.getElementById("as2").innerHTML = precision(As2);
    
    console.log(n1);
    document.getElementById("tensionBar").innerHTML = Math.ceil(n1);

    console.log(n2);
    document.getElementById("compressionBar").innerHTML = Math.ceil(n2);

   

    
} 


/*
function concrete_grade_check(){
    if (k = NaN) return { k1: "Increase concrete section"}

    return{ k1 = k}

    }
    var {k1} = concrete_grade_check()*/