// Get the button that opens the modal
var send_feedback = document.getElementById("send_feedback");
var span = document.getElementsByClassName("close")[0];
var feedback_modal = document.getElementById("feedback_modal");

var validated_fields = []

send_feedback.onclick = function() {
    feedback_modal.style.display = "block";
    var searchEles = document.getElementById("modal-body").children;
    for (i = 0; i < searchEles.length; i++) {
        if (["INPUT", "TEXTAREA"].includes(searchEles[i].tagName)) {
            try {
                searchEles[i].value = get_from_localstorage(searchEles[i])
                if (searchEles[i].value != "") {
                    validated_fields.push(searchEles[i])
                }
            } catch (err) {
                searchEles[i].value = ""
            }
        }
    }
  }

span.onclick = function() {
    feedback_modal.style.display = "none";
    var searchEles = document.getElementById("modal-body").children;
    for (i = 0; i < searchEles.length; i++) {
        if (["INPUT", "TEXTAREA"].includes(searchEles[i].tagName)) {
            if (validated_fields.includes(searchEles[i]) && searchEles[i].value != "") {
                save_to_localstorage(searchEles[i])
            }
        }
    }
  }

window.onclick = function(event) {
    if (event.target == feedback_modal) {
        feedback_modal.style.display = "none";
    }
    var searchEles = document.getElementById("modal-body").children;
    for (i = 0; i < searchEles.length; i++) {
        if (["INPUT", "TEXTAREA"].includes(searchEles[i].tagName)) {
            if (validated_fields.includes(searchEles[i]) && searchEles[i].value != "") {
                save_to_localstorage(searchEles[i])
            }
        }
    }
}

function validate_field(elem) {
    function mark_filed(elem, color) {
        elem.style.backgroundColor = color;
    }    
    function check_match(elem, regex) {
        if (elem.value.match(regex)) {
            mark_filed(elem, "white")
            if (validated_fields.indexOf(elem) === -1) {
                validated_fields.push(elem)
            }
        } else {
            mark_filed(elem, "#ff6e6e")
            if (validated_fields.indexOf(elem) !== -1) {
                validated_fields.splice(validated_fields.indexOf(elem), 1);
            }
        }
    }
    switch (elem.id) {
        case 'name_field':
            check_match(elem, /^[a-zA-Z]+$/)
            break;
        case 'surname_field':
            check_match(elem, /^[a-zA-Z]+$/)
            break;
        case 'email_field':
            check_match(elem, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            break;
        case 'phone_number':
            check_match(elem, /^\+\d\(?\d{3}\)?\d{2}\-?\d{2}\-?\d{3}$/)
            break;
        case 'message_field':
            check_match(elem, /.+/)
            break;
        default:
            break;
    }
}


document.getElementById("modal-body").addEventListener('change', function(event) {
    validate_field(event.target)
});

document.getElementById("send_form").addEventListener('click', function() {
    if (get_cookie('feedback') == 'true') {
        feedback_modal.style.display = "none";
        alert("Your feedback already sended")
    } else {
        var any_erorr = false;
        var searchEles = document.getElementById("modal-body").children;
        for (i = 0; i < searchEles.length; i++) {
            if (["INPUT", "TEXTAREA"].includes(searchEles[i].tagName)) {
                if (!validated_fields.includes(searchEles[i])) {
                    any_erorr = true;
                    validate_field(searchEles[i]);
                }
            }
        }
        if (!any_erorr) {
            feedback_modal.style.display = "none";
            validated_fields = [];
            set_cookie('feedback', 'true');
            alert("Form sended successfully");
        }
    }
});


function save_to_localstorage(elem) {
    set_cookie_element(elem)
    localStorage.setItem(elem.id, elem.value)
}

function get_from_localstorage(elem) {
    return localStorage.getItem(elem.id)
}

function set_cookie_element(elem) {
    if (['name_field', 'surname_field'].includes(elem.id)) {
        document.cookie = elem.id+"="+elem.value
    }
}

function set_cookie(key, value) {
    document.cookie = key+"="+value
}
  
function get_cookie(name) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`)
    const match = document.cookie.match(regex)
    if (match) {
        return match[2]
    }
}
