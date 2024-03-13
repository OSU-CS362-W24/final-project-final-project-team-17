const sortPoints = require( "../sortPoints" ) ; 

// Initial Test. 

test( "Initial Test. " , function () { 
    var inputList = [ 
        { x: 2 , y: 10 } , 
        { x : 1 , y : 12 } 
    ] ; 
    var outputList = [ 
        { x : 1 , y : 12 } , 
        { x: 2 , y: 10 } 
    ] ; 
    expect( sortPoints( inputList ) ).toStrictEqual( outputList ) ; 
}) ; 

