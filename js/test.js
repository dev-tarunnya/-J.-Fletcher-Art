

tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#0000CD',
        'primary-dark': '#000099',
        'primary-light': '#3333FF',
        secondary: '#8B2323',
        'secondary-dark': '#6B1A1A',
        'secondary-light': '#A82E2E',
        button: '#FEE469',
        'button-hover': '#FDD835',
        'button-dark': '#E6CE50',
        surface: '#FAFAFA',
        dark: '#0A0A0A',
        'dark-soft': '#1A1A1A',
        muted: '#6B7280',
        'muted-light': '#9CA3AF',
        border: '#E5E7EB',
        'border-dark': '#D1D5DB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    }
  }
}


// ===== Hero Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');
const slideCounter = document.getElementById('slide-current');
let sliderInterval;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  slideCounter.textContent = String(currentSlide + 1).padStart(2, '0');
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function startSlider() {
  sliderInterval = setInterval(nextSlide, 5000);
}

function resetSlider() {
  clearInterval(sliderInterval);
  startSlider();
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.dot));
    resetSlider();
  });
});

startSlider();

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
const logoText = document.getElementById('logo-text');
const navLinks = document.querySelectorAll('#nav-shop, #nav-cat, #nav-ed, #nav-about, #nav-contact');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.style.background = 'rgba(255,255,255,0.95)';
    navbar.style.backdropFilter = 'blur(24px)';
    navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    logoText.style.color = '#0A0A0A';
    navLinks.forEach(l => { l.style.color = '#6B7280'; l.onmouseover = () => l.style.color = '#0000CD'; l.onmouseout = () => l.style.color = '#6B7280'; });
    document.getElementById('search-btn').style.color = '#6B7280';
    document.getElementById('cart-btn').style.color = '#6B7280';
    document.getElementById('menu-toggle').style.color = '#6B7280';
  } else {
    navbar.style.background = 'transparent';
    navbar.style.backdropFilter = 'none';
    navbar.style.boxShadow = 'none';
    logoText.style.color = 'white';
    navLinks.forEach(l => { l.style.color = 'rgba(255,255,255,0.8)'; l.onmouseover = () => l.style.color = 'white'; l.onmouseout = () => l.style.color = 'rgba(255,255,255,0.8)'; });
    document.getElementById('search-btn').style.color = 'rgba(255,255,255,0.8)';
    document.getElementById('cart-btn').style.color = 'rgba(255,255,255,0.8)';
    document.getElementById('menu-toggle').style.color = 'rgba(255,255,255,0.8)';
  }
});

// ===== Mobile Menu =====
const mobileMenu = document.getElementById('mobile-menu');
document.getElementById('menu-toggle').addEventListener('click', () => mobileMenu.classList.add('open'));
document.getElementById('menu-close').addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== Reveal on Scroll =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Filter Tabs =====
const filterTabs = document.querySelectorAll('.filter-tab');
const productCards = document.querySelectorAll('.product-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => {
      t.classList.remove('active');
      t.style.background = 'transparent';
      t.style.borderColor = '#E5E7EB';
      t.style.color = '#6B7280';
    });
    tab.classList.add('active');
    tab.style.background = '#0000CD';
    tab.style.borderColor = '#0000CD';
    tab.style.color = 'white';

    const filter = tab.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Initialize active tab style
document.querySelector('.filter-tab.active').style.background = '#0000CD';
document.querySelector('.filter-tab.active').style.borderColor = '#0000CD';
document.querySelector('.filter-tab.active').style.color = 'white';

// ===== Product Modal =====
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalPrice = document.getElementById('modal-price');
const sizeOptions = document.querySelectorAll('#modal-sizes .size-option');
let selectedPrice = 89;

// Open modal on product card click (image area)
document.querySelectorAll('.product-card .product-image img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    const card = img.closest('.product-card');
    modalImage.src = img.src;
    modalTitle.textContent = card.querySelector('h3').textContent;
    modalCategory.textContent = card.querySelector('.text-muted.text-xs').textContent;
    modalImage.alt = card.querySelector('h3').textContent;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Reset size selection
    sizeOptions.forEach(s => s.classList.remove('selected'));
    sizeOptions[0].classList.add('selected');
    selectedPrice = 89;
    modalPrice.textContent = 'AU$89';
  });
});

// Close modal
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-close-mobile').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', closeModal);

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Size selection in modal
sizeOptions.forEach(option => {
  option.addEventListener('click', () => {
    sizeOptions.forEach(s => s.classList.remove('selected'));
    option.classList.add('selected');
    selectedPrice = parseInt(option.dataset.price);
    modalPrice.textContent = `AU${selectedPrice}`;
    document.getElementById('modal-add-to-cart').innerHTML = `
      <span class="iconify" data-icon="lucide:shopping-bag" data-width="18"></span>
      Add to Cart — AU$${selectedPrice}
    `;
  });
});

// ===== Cart Logic =====
let cartCount = 0;
const cartBadge = document.getElementById('cart-count');

function addToCart(name, price) {
  cartCount++;
  cartBadge.textContent = cartCount;
  cartBadge.style.transform = 'scale(1.3)';
  setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
  showToast(`${name} (AU$${price}) added to cart`);
}

document.getElementById('modal-add-to-cart').addEventListener('click', () => {
  addToCart(modalTitle.textContent, selectedPrice);
  closeModal();
});

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(btn.dataset.name, btn.dataset.price);
  });
});

// ===== Toast =====
function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== Newsletter Form (Anti-spam) =====
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const honeypot = document.getElementById('hp_website').value;
  if (honeypot) return; // Bot detected, silently ignore

  const email = document.getElementById('newsletter-email').value;
  const msgEl = document.getElementById('newsletter-message');

  if (!email || !email.includes('@')) {
    msgEl.textContent = 'Please enter a valid email address.';
    msgEl.className = 'mt-4 text-sm text-secondary';
    msgEl.classList.remove('hidden');
    return;
  }

  // Simulate success
  msgEl.textContent = '✓ Welcome aboard! Check your inbox for confirmation.';
  msgEl.className = 'mt-4 text-sm text-primary font-medium';
  msgEl.classList.remove('hidden');
  document.getElementById('newsletter-email').value = '';

  setTimeout(() => msgEl.classList.add('hidden'), 5000);
});

// ===== Lightbox (for category/featured images) =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');

document.querySelectorAll('.category-card img, .category-card').forEach(card => {
  if (card.tagName === 'IMG') {
    card.style.cursor = 'zoom-in';
    card.addEventListener('click', () => {
      lightboxImage.src = card.src;
      lightboxImage.alt = card.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
});

document.getElementById('lightbox-close').addEventListener('click', () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== Keyboard Support =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    lightbox.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== Load More (simulated) =====
document.getElementById('load-more').addEventListener('click', function() {
  this.innerHTML = '<span class="iconify animate-spin" data-icon="lucide:loader-2" data-width="18"></span> Loading...';
  this.disabled = true;
  setTimeout(() => {
    this.innerHTML = 'All Prints Loaded';
    this.disabled = true;
    this.style.opacity = '0.5';
    this.style.cursor = 'default';
  }, 1500);
});

// ===== Initial Hero Reveal =====
window.addEventListener('load', () => {
  document.querySelectorAll('#hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('active'), 300 + i * 150);
  });
});
