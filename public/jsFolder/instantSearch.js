$(function(){
    $('#search').keyup(function(){
		var farm = $(this).val();
		console.log(farm);
        $.ajax({
            method : 'POST',
            url:'/api_farms/searcher',
            data:{
                farm
            },
            datatype: 'json',
            success: function(data, results) {
                $('#searchResults').empty();
                if (data.data!= null && data.success) {
                    
                    console.log('success!');
                    $('#searchResults').append(` Total :<span>${data.data.length} Farm<span style="text-transform:lowercase">(s)</span></span><hr>`);
                    var availablefarms = [];

                    for(let i=0; i < data.data.length; i++){
                        let farm = data.data[i]._source;
                        // var availablefarms = [farm.name];
                        // console.log(availablefarms);
                       
                        $('#searchResults').append(`
                            <span>Name: ${farm.name} </span><br>
                            <span>Crop: ${farm.crop} </span><br>
                            <span>Acreage: ${farm.acreage} </span><hr>
                        `);
                        availablefarms.push(farm.name);
                    }

                    $('#search').autocomplete({source: availablefarms});
                    console.log('results : ' + availablefarms);
                    $('#searchContainer').show();
                }else{
                    $('#searchContainer').show();
                    $('#searchResults').append(`<span> No Farm Found! </span><hr>`);
                }
            },
            error: function(err){
                console.log(err);
            }
        })
    })
});
