import { VALIDATION_RULES } from './constants';

// Validate email
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

// Validate password
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`;
  }
  if (password.length > VALIDATION_RULES.PASSWORD_MAX_LENGTH) {
    return `Password must be less than ${VALIDATION_RULES.PASSWORD_MAX_LENGTH} characters`;
  }
  return '';
};

// Validate confirm password
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

// Validate name
export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    return `Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters`;
  }
  if (name.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    return `Name must be less than ${VALIDATION_RULES.NAME_MAX_LENGTH} characters`;
  }
  return '';
};

// Validate phone
export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required';
  if (!VALIDATION_RULES.PHONE_REGEX.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return '';
};

// Validate address
export const validateAddress = (address) => {
  if (!address) return 'Address is required';
  if (address.length < 5) {
    return 'Please enter a valid address';
  }
  return '';
};

// Validate ZIP code
export const validateZipCode = (zipCode) => {
  if (!zipCode) return 'ZIP code is required';
  if (!VALIDATION_RULES.ZIP_CODE_REGEX.test(zipCode)) {
    return 'Please enter a valid ZIP code';
  }
  return '';
};

// Validate price
export const validatePrice = (price) => {
  if (!price && price !== 0) return 'Price is required';
  if (isNaN(price) || price <= 0) {
    return 'Please enter a valid price';
  }
  return '';
};

// Validate quantity
export const validateQuantity = (quantity, min = 1, max = 999) => {
  if (!quantity) return 'Quantity is required';
  if (isNaN(quantity) || quantity < min || quantity > max) {
    return `Quantity must be between ${min} and ${max}`;
  }
  return '';
};

// Validate product name
export const validateProductName = (name) => {
  if (!name) return 'Product name is required';
  if (name.length < 3) {
    return 'Product name must be at least 3 characters';
  }
  if (name.length > 100) {
    return 'Product name must be less than 100 characters';
  }
  return '';
};

// Validate product description
export const validateProductDescription = (description) => {
  if (!description) return 'Description is required';
  if (description.length < 20) {
    return 'Description must be at least 20 characters';
  }
  if (description.length > 2000) {
    return 'Description must be less than 2000 characters';
  }
  return '';
};

// Validate review rating
export const validateRating = (rating) => {
  if (!rating) return 'Please select a rating';
  if (rating < 1 || rating > 5) {
    return 'Rating must be between 1 and 5';
  }
  return '';
};

// Validate review comment
export const validateReviewComment = (comment) => {
  if (!comment) return 'Please enter a review comment';
  if (comment.length < 10) {
    return 'Review must be at least 10 characters';
  }
  if (comment.length > 500) {
    return 'Review must be less than 500 characters';
  }
  return '';
};

// Validate card number (Luhn algorithm)
export const validateCardNumber = (cardNumber) => {
  if (!cardNumber) return 'Card number is required';
  
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) {
    return 'Please enter a valid card number';
  }
  
  // Luhn algorithm
  let sum = 0;
  let alternate = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let n = parseInt(cleaned.charAt(i), 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n = (n % 10) + 1;
    }
    sum += n;
    alternate = !alternate;
  }
  
  if (sum % 10 !== 0) {
    return 'Please enter a valid card number';
  }
  
  return '';
};

// Validate CVV
export const validateCVV = (cvv) => {
  if (!cvv) return 'CVV is required';
  const cleaned = cvv.replace(/\D/g, '');
  if (cleaned.length < 3 || cleaned.length > 4) {
    return 'Please enter a valid CVV';
  }
  return '';
};

// Validate expiry date
export const validateExpiryDate = (expiry) => {
  if (!expiry) return 'Expiry date is required';
  
  const [month, year] = expiry.split('/');
  if (!month || !year) return 'Please enter a valid expiry date (MM/YY)';
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);
  
  if (expMonth < 1 || expMonth > 12) {
    return 'Please enter a valid month';
  }
  
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return 'Card has expired';
  }
  
  return '';
};

// Validate URL
export const validateUrl = (url) => {
  if (!url) return '';
  try {
    new URL(url);
    return '';
  } catch {
    return 'Please enter a valid URL';
  }
};

// Validate date
export const validateDate = (date) => {
  if (!date) return 'Date is required';
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return 'Please enter a valid date';
  }
  return '';
};

// Validate login form
export const validateLoginForm = (data) => {
  const errors = {};
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

// Validate register form
export const validateRegisterForm = (data) => {
  const errors = {};
  
  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  if (!data.role) {
    errors.role = 'Please select a role';
  }
  
  return errors;
};

// Validate profile form
export const validateProfileForm = (data) => {
  const errors = {};
  
  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  if (data.phone) {
    const phoneError = validatePhone(data.phone);
    if (phoneError) errors.phone = phoneError;
  }
  
  if (data.address) {
    const addressError = validateAddress(data.address);
    if (addressError) errors.address = addressError;
  }
  
  if (data.zipCode) {
    const zipError = validateZipCode(data.zipCode);
    if (zipError) errors.zipCode = zipError;
  }
  
  return errors;
};

// Validate product form
export const validateProductForm = (data) => {
  const errors = {};
  
  const nameError = validateProductName(data.name);
  if (nameError) errors.name = nameError;
  
  const priceError = validatePrice(data.price);
  if (priceError) errors.price = priceError;
  
  const quantityError = validateQuantity(data.quantity);
  if (quantityError) errors.quantity = quantityError;
  
  const descriptionError = validateProductDescription(data.description);
  if (descriptionError) errors.description = descriptionError;
  
  if (!data.category) {
    errors.category = 'Please select a category';
  }
  
  return errors;
};

// Validate checkout form
export const validateCheckoutForm = (data) => {
  const errors = {};
  
  // Shipping address
  const firstNameError = validateName(data.firstName);
  if (firstNameError) errors.firstName = firstNameError;
  
  const lastNameError = validateName(data.lastName);
  if (lastNameError) errors.lastName = lastNameError;
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;
  
  const addressError = validateAddress(data.address);
  if (addressError) errors.address = addressError;
  
  const cityError = validateName(data.city);
  if (cityError) errors.city = cityError;
  
  const zipError = validateZipCode(data.zipCode);
  if (zipError) errors.zipCode = zipError;
  
  // Payment
  if (data.paymentMethod === 'card') {
    const cardError = validateCardNumber(data.cardNumber);
    if (cardError) errors.cardNumber = cardError;
    
    const cvvError = validateCVV(data.cvv);
    if (cvvError) errors.cvv = cvvError;
    
    const expiryError = validateExpiryDate(data.expiry);
    if (expiryError) errors.expiry = expiryError;
    
    const nameError = validateName(data.cardName);
    if (nameError) errors.cardName = nameError;
  }
  
  return errors;
};