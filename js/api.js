$(document).ready(function () {
    database.collection('profile').get().then((data) => {
        var result = "";
        data.forEach(element => {
            // console.log(element.data().name);
            result += `
                    <div class="card shadow-lg mt-4">
                        <div class="card-header">
                            <img src="${element.data().profile}" width="40px" height="40px" style="border-radius: 50%">
                            ${element.data().name}
                            <button class="btn btn-info float-right" type="button" data-toggle="modal" data-target="#v${element.id}">View</button>
                        </div>
                        <div class="card-body">
                            <img src="${element.data().post}" class="img-fluid">
                            <hr>
                            ${element.data().text}
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-danger btn-sm float-right" type="button" onclick="deletePic('${element.id}')">Delete</button>
                        </div>
                    </div>
                    <!-- The Modal -->
                    <div class="modal fade" id="v${element.id}">
                      <div class="modal-dialog">
                        <div class="modal-content">
                        
                          <!-- Modal Header -->
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                          </div>
                          
                          <!-- Modal body -->
                          <div class="modal-body">
                          <img src="${element.data().post}" class="img-fluid">
                          </div>                          
                        </div>
                      </div>
                    </div>
                `
        });
        $('#result').append(result);
    })
    $('#add').on('click', function () {
        var name = $('#name').val();
        var profile = $('#profile').val();
        var post = $('#post').val();
        var text = $('#text').val();
        database.collection('profile').add({
            name: name,
            profile: profile,
            post: post,
            text: text,

        })
    })
    $('#add').on('click', function () {
        $('#name').val("");
        $('#profile').val("");
        $('#post').val("");
        $('#text').val("");
    })
})
function deletePic(dl) {
    database.collection('profile').doc(dl).delete();
}
