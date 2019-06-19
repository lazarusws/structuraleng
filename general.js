// ---------------------------------------------------------------------

function precision( num ) 
{
   var digits;
   var value;

   digits = parseInt( document.getElementById( "digits" ).value );
   value = num.toPrecision( digits );

   return value;
}

// ---------------------------------------------------------------------

function scientific( num ) 
{
   var digits;
   var value;

   digits = parseInt( document.getElementById( "digits" ).value );
   value = num.toExponential( digits );

   return value;
}

// ---------------------------------------------------------------------

function transfer( from, to) 
{
   document.getElementById( to ).value = document.getElementById( from ).value;

   return true;
}
