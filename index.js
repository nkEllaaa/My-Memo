function getMemoTitle() {
  const memoTitle = document.querySelector('#memotitle').value;
  return memoTitle;
}

function getMemoContent() {
  const memoContent = document.querySelector('#memo').value;
  return memoContent;
}

function resetInput() {
  document.querySelector('#memotitle').value = '';
  document.querySelector('#memo').value = '';
}

function createMemo() {
  const title = getMemoTitle();
  const content = getMemoContent();

  const memoObj = {
    title: title,
    content: content,
  };

  return memoObj;
}

const memolists = [];

function saveMemo(memo) {
  const savedData = JSON.parse(localStorage.getItem('memolists')) || [];
  savedData.push(memo);
  localStorage.setItem('memolists', JSON.stringify(savedData));
}

function getMemos() {
  const memos = localStorage.getItem('memolists');
  if (memos) {
    return JSON.parse(memos);
  } else {
    return [];
  }
}

function showMemo() {
  const memos = getMemos();
  memos.forEach(function (memo) {
    const $memoLi = createMemoLi(memo);
    const $memoUl = document.querySelector('.memolists');
    $memoUl.appendChild($memoLi);
  });

  const savedData = JSON.parse(localStorage.getItem('memolists')) || [];

  const $memoLists = savedData.map(createMemoLi);
  const $memoUl = document.querySelector('.memolists');
  $memoUl.innerHTML = '';
  $memoUl.append(...$memoLists);
}

const addMemo = () => {
  const $memoTitle = document.querySelector('#memo-title');
  const $memoContent = document.querySelector('#memo-content');

  if (!$memoTitle.value || !$memoContent.value) {
    alert('제목과 내용을 입력해주세요.');
    return;
  }
  const memo = {
    id: Date.now(), 
    title: $memoTitle.value,
    content: $memoContent.value,
  };
  const memos = JSON.parse(localStorage.getItem('memos')) || [];
  memos.push(memo);
  localStorage.setItem('memos', JSON.stringify(memos));

  const $memoList = document.querySelector('#memo-list');
  $memoList.appendChild(createMemoLi(memo));

  $memoTitle.value = '';
  $memoContent.value = '';
};

const removeMemo = event => {
  const target = event.target.parentElement;
  const id = event.target.dataset.id;
  target.remove();

  const memos = JSON.parse(localStorage.getItem('memolists')) || [];
  const updatedMemos = memos.filter(memo => {
    return memo.id === Number(id);
  });
  localStorage.setItem('memolists', JSON.stringify(updatedMemos));
};

function createMemoLi(memo) {
  const $memoLi = document.createElement('li');
  const $title = document.createElement('strong');
  const $content = document.createElement('p');
  $title.innerHTML = memo.title;
  $content.innerHTML = memo.content;
  $memoLi.append($title, $content);

  const $deleteButton = document.createElement('button');
  $deleteButton.innerHTML = '삭제';
  $deleteButton.addEventListener('click', removeMemo);
  $deleteButton.dataset.id = memo.id;
  $memoLi.append($deleteButton);

  return $memoLi;
}

function buttonOnclickHandler() {
  const title = getMemoTitle();
  const content = getMemoContent();

  if (title.trim() === '') {
    alert('제목을 입력해주세요.');
    return;
  }

  const memoObj = {
    title: title,
    content: content,
  };

  saveMemo(memoObj);
  showMemo();
  resetInput();
}

const $memoButton = document.querySelector('#memosubmit');
$memoButton.onclick = buttonOnclickHandler;

const myTitle = document.querySelector('.memo-title');
const maxTitleLength = parseInt(myTitle.getAttribute('maxlength'));

myTitle.addEventListener('keydown', function (event) {
  const currentLength = this.value.length;

  if (currentLength >= maxTitleLength && event.keyCode !== 8 && event.keyCode !== 46) {
    event.preventDefault();
    return false;
  }
});

const myTextarea = document.querySelector('.memo-text');
const maxLength = parseInt(myTextarea.getAttribute('maxlength'));

myTextarea.addEventListener('keydown', function (event) {
  const currentLength = this.value.length;

  if (currentLength >= maxLength && event.keyCode !== 8 && event.keyCode !== 46) {
    event.preventDefault();
    return false;
  }
});

const deleteAllMemo = document.querySelector('.btn-delete')
deleteAllMemo.onclick = deleteAllMemos;

function deleteAllMemos() {
  if (confirm('모든 메모를 삭제하시겠습니까?')) {
    localStorage.removeItem('memolists');
    const $memoUl = document.querySelector('.memolists');
    $memoUl.innerHTML = '';
  }
}

showMemo();