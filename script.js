// set year in footers across pages
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  // generic ids used in pages: year, year-2 ... year-7
  const ids = ['year','year-2','year-3','year-4','year-5','year-6','year-7'];
  ids.forEach(id=>{
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });

  // mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      if (!nav) return;
      if (nav.style.display === 'block') nav.style.display = '';
      else nav.style.display = 'block';
    });
  }

  // Live mock test logic
  initLiveTest();
});

// enroll quick alert
function enroll(course) {
  alert(course + " কোর্সে আগ্রহী হওয়ার জন্য ধন্যবাদ! বিস্তারিত জানতে কল করুন: 9382963251");
}

// contact form handler (mailto)
function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('cf-name')?.value?.trim();
  const email = document.getElementById('cf-email')?.value?.trim();
  const msg = document.getElementById('cf-msg')?.value?.trim();

  if (!name || !email || !msg) {
    alert('অনুগ্রহ করে সব ফিল্ড পূরণ করুন।');
    return;
  }

  const subject = encodeURIComponent('UNIC MATHEMATICS — Contact: ' + name);
  const body = encodeURIComponent(`নাম: ${name}\nইমেইল: ${email}\n\nমেসেজ:\n${msg}`);
  window.location.href = `mailto:daskumarpradip9382@gmail.com?subject=${subject}&body=${body}`;
}

// Live test functions
function initLiveTest(){
  const startBtn = document.getElementById('startBtn');
  const timerEl = document.getElementById('timer');
  const durationSel = document.getElementById('duration');
  const submitBtn = document.getElementById('submitTestBtn');
  const form = document.getElementById('liveTestForm');

  if (!startBtn || !timerEl || !durationSel || !submitBtn || !form) return;

  let interval = null;
  let timeLeft = 0;
  function formatTime(s){
    const m = Math.floor(s/60);
    const sec = s%60;
    return `${m}:${sec<10? '0'+sec : sec}`;
  }

  startBtn.addEventListener('click', () => {
    if (interval) return; // already started
    timeLeft = parseInt(durationSel.value,10);
    timerEl.textContent = formatTime(timeLeft);
    interval = setInterval(()=>{
      timeLeft--;
      timerEl.textContent = formatTime(timeLeft);
      if (timeLeft <= 0){
        clearInterval(interval);
        interval = null;
        timerEl.textContent = "00:00";
        finalizeTest();
      }
    },1000);
    startBtn.disabled = true;
    durationSel.disabled = true;
  });

  submitBtn.addEventListener('click', () => {
    if (confirm("আপনি কি নিশ্চিত আপনার উত্তর জমা দিতে চান?")) {
      finalizeTest();
    }
  });

  function finalizeTest(){
    // disable form inputs
    Array.from(form.querySelectorAll('input, button')).forEach(el => el.disabled = true);
    alert("Test submitted (demo). Thank you!");
    // TODO: integrate server-side submission if required
  }
}