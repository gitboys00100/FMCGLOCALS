window.onload = function() {
  if($('#file-input-upload').length > 0) {

    document.getElementById('file-input-upload').onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;
        var fname = '';
        console.log(files);
        // FileReader support
        var type = '';
        for (var i = 0, f; f = files[i]; i++) {
          fname = f.name;
          type = f.type;
        }
        if(type.match('image')) {
          if (FileReader && files && files.length) {
              var fr = new FileReader();
              fr.onload = function () {
                  document.getElementById('fname').value = fname;
                  document.getElementById('profile_image').src = fr.result;
              }
              fr.readAsDataURL(files[0]);
          }

          // Not supported
          else {
              // fallback -- perhaps submit the input to an iframe and temporarily store
              // them on the server until the user's session ends.
          }
        }
        else {
          document.getElementById("image_name").value = "";
          document.getElementById("file-input-upload").value = "";
          document.getElementById('profile_image').src = '../../../assets/img/default-avatar.jpg';
        }

    }

  }

}
