document.getElementById('join-form').action=window.location.href;

window.addEventListener("load",()=>{
    $('#call-checkbox').click(()=>{
        if($('#call-checkbox').prop('checked')){
            $('#call-checkbox').prop('value',"1");
            $('.form-check-label').text('Call + Chat');
        }
        else{
            $('#call-checkbox').prop('value',"0");
            $('.form-check-label').text('Just chat');
        }
    })
})