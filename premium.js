const pages = Array.from(document.querySelectorAll('.page'));
const progressFill = document.querySelector('.progress-fill');

let currentPage = 0;
let firstImpression = '';
let likeReason = '';
let favoritePart = '';
let dreamDate = '';

function updateProgress(index) {
  const progress = ((index + 1) / pages.length) * 100;
  if (progressFill) {
    progressFill.style.width = `${Math.min(progress, 100)}%`;
  }
}

function showPage(index) {
  if (!pages[index]) return;
  pages.forEach((page, pageIndex) => {
    page.classList.toggle('active', pageIndex === index);
    page.setAttribute('aria-hidden', pageIndex === index ? 'false' : 'true');
  });
  currentPage = index;
  updateProgress(index);
}

function attachSelection(cards, onSelect) {
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      cards.forEach((item) => item.classList.remove('selected'));
      card.classList.add('selected');
      onSelect(card);
    });
  });
}

attachSelection(document.querySelectorAll('.answer-card'), (card) => {
  firstImpression = card.dataset.value;
});
attachSelection(document.querySelectorAll('.reason-card'), (card) => {
  likeReason = card.dataset.value;
});
attachSelection(document.querySelectorAll('.favorite-card'), (card) => {
  favoritePart = card.dataset.value;
});
attachSelection(document.querySelectorAll('.date-card'), (card) => {
  dreamDate = card.dataset.value;
});

document.querySelectorAll('.nextBtn').forEach((button) => {
  button.addEventListener('click', function () {
    const nextPage = Number(this.dataset.next);

    if (currentPage === 3 && firstImpression === '') {
      alert('Please choose your first impression ❤️');
      return;
    }
    if (currentPage === 4 && likeReason === '') {
      alert('Please choose what made you like me ❤️');
      return;
    }
    if (currentPage === 5 && favoritePart === '') {
      alert('Please choose your favorite part ❤️');
      return;
    }
    if (currentPage === 6 && dreamDate === '') {
      alert('Choose our first date ❤️');
      return;
    }

    showPage(nextPage);
  });
});

showPage(0);

const yesBtn = document.querySelector('.yesBtn');
const noBtn = document.querySelector('.noBtn');

if (yesBtn) {
  yesBtn.addEventListener('click', function () {
    const templateParams = {
      first_impression: firstImpression,
      like_reason: likeReason,
      favorite_part: favoritePart,
      dream_date: dreamDate,
      final_answer: 'YES ❤️'
    };

    yesBtn.innerHTML = 'Sending...';
    yesBtn.disabled = true;

    window.emailjs
      .send('service_hxcx4vz', 'template_dwkf20c', templateParams)
      .then(() => {
        showPage(8);
      })
      .catch((error) => {
        console.error(error);
        alert('Email failed to send.');
        yesBtn.innerHTML = 'YES ❤️';
        yesBtn.disabled = false;
      });
  });
}

if (noBtn) {
  noBtn.addEventListener('click', () => {
    alert("That's okay ❤️\nTake all the time you need.");
  });
}

const finishBtn = document.getElementById('finishBtn');

if (finishBtn) {
  finishBtn.addEventListener('click', () => {
    finishBtn.style.display = 'none';

    const pageNineTitle = document.querySelector('#page9 h1');
    const pageNineSubtitle = document.querySelector('#page9 h2');
    const endingText = document.querySelector('.ending-text');

    if (pageNineTitle) {
      pageNineTitle.innerHTML = '❤️ Forever Starts Here ❤️';
    }
    if (pageNineSubtitle) {
      pageNineSubtitle.innerHTML = 'This Is The Beginning Of Our Love Story';
    }
    if (endingText) {
      endingText.innerHTML = `
        Thank you for saying <b>YES</b>. ❤️
        <br><br>
        I promise to always respect you,
        support you,
        and never stop making you smile.
        <br><br>
        I don't know where life will take us...
        But I hope we'll walk that journey together.
        <br><br>
        I Love You ❤️
      `;
    }

    createConfetti();
  });
}

function createConfetti() {
  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDelay = `${Math.random() * 3}s`;
    confetti.style.background = ['#ff4d8d', '#ffb3d1', '#ffd700', '#ffffff'][Math.floor(Math.random() * 4)];

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 6000);
  }
}
