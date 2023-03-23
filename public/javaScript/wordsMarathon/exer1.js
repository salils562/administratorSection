let container = document.getElementById('updation-deletion');
let alertMsg = document.getElementById('alertMsg');

const fetchData = async () => {
  const data = await fetch('/word-exer1Data', {
    method: "GET",
    headers: { "Content-type": "application/json" }
  });
  const result = await data.json();
  let html = "";
  result.forEach((element, index) => {
    html += `<div class='question-item'>
      <span class='number'>${index + 1} ) </span>
      <span class='questions'>${element.question}</span>
      <span class='options'>
      <ul>
      <li class='inserted-options'>${element.options[0]}</li>
      <li class='inserted-options'>${element.options[1]}</li>
      <li class='inserted-options'>${element.options[2]}</li>
      </ul>
      </span>
      <span class='target-word-ques'>Target: <span class='question-item-ans'>${element.targetword}</span></span></br>
      <span class='answer'>Answer: <span class='question-item-ans'>${element.answer}</span></span>
      <div class='update-delete-btns'>
      <button class='btn btn-danger btn-sm deletebutton' id=${element._id}>Delete Question</button>
      <a href='#updation-box'><button class='btn btn-primary btn-sm updatebuttons' id=${element._id + 'a'}>Update Question</button></a>
      </div>
      </div>
      `;
  });
  container.innerHTML = html;
  deleteData();
  activateUpdation();
  updateModel();
}
fetchData();

deleteData = () => {
  let deleteButtons = document.getElementsByClassName("deletebutton");
  Array.from(deleteButtons).forEach((element) => {
    element.addEventListener('click', async () => {
      let conformation = confirm("Are you sure to want to delete?");
      if (conformation) {
        const data = await fetch('/word-exer1', {
          method: "DELETE",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ _id: element.id })
        });
        const result = await data.json();
        fetchData();
      }
    });
  });
}

// updation questions code

const updateQuestion = document.getElementById('updatequestion');
const updateAnswer = document.getElementById('updateanswer');
const updateTarget = document.getElementById('updatetarget');
const updateOptions = document.getElementsByClassName('update-options-input');
const finalUpdate = document.getElementById('final-update');
const updateId = document.getElementById('_id');
const activateUpdation = () => {
  const updatebutton = document.getElementsByClassName('updatebuttons');
  const questionItem = document.getElementsByClassName('question-item');
  console.log(Array.from(updatebutton).length);
  console.log(Array.from(questionItem).length);
  Array.from(updatebutton).forEach((element, index) => {
    element.addEventListener('click', () => {
      finalUpdate.disabled = false;
      updateQuestion.value = questionItem[index].children[1].innerText;
      updateAnswer.value = (questionItem[index].children[5].innerText).replace('Answer: ', '');
      updateTarget.value = (questionItem[index].children[3].innerText).replace('Target: ', '');
      updateId.innerText = (element.id).slice(0, element.id.length - 1);
      Array.from(updateOptions).forEach((e, i) => {
        e.value = questionItem[index].children[2].children[0].children[i].innerText;
      });
    });
  });
}
const updateModel = () => {
  finalUpdate.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      let newupdateOptions = document.getElementsByClassName('update-options-input');
      let optionsUp = [];
      Array.from(newupdateOptions).forEach((element) => {
        optionsUp.push(element.value);
      });
      console.log(optionsUp);
      let Updateobj = {
        _id: document.getElementById('_id').innerText,
        question: updateQuestion.value,
        targetword: updateTarget.value,
        options: optionsUp,
        answer: updateAnswer.value
      }
      const result = await fetch('/word-exer1', {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(Updateobj)
      });
      let data = await result.json();
      if (Object.keys(data).length > 0) {
        updateQuestion.value = "";
        updateTarget.value = "";
        updateAnswer.value = "";
        Array.from(updateOptions).forEach((element) => {
          element.value = "";
        });
        finalUpdate.disabled = true;
        Useralert('success','Updated Successfully');
        fetchData();
      } else {
        Useralert('danger','Err! unable to update');
      }
    } catch (e) {
      alert("unable to update");
    }
  });
}

document.getElementById('clear-update').addEventListener('click', () => {
  finalUpdate.disabled='true';
  updateAnswer.value = '';
  updateQuestion.value = '';
  updateTarget.value = '';
  Array.from(updateOptions).forEach((element) => {
    element.value = '';
  });
  updateId.innerText = '';
  Useralert('success','Cleared Successfully');
});

const Useralert = (type,msg) => {
  if(type==='danger'){
    alertMsg.className='alert alert-danger alert-dismissible fade';
  }else if(type==='success'){
    alertMsg.className='alert alert-success alert-dismissible fade';
  }
    document.querySelector('.my-alert').style.display='block';
    document.getElementById('set-alert-msg').innerText=' '+msg;
    document.getElementById('set-alert-mode').innerText=type+' :';
  alertMsg.classList.add('show');
  setTimeout(() => {
    alertMsg.classList.remove('show');
    document.querySelector('.my-alert').style.display='none';
  }, 4000);
}