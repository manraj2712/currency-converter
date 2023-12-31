import { CustomError } from "./customError";

function validateConversionInput({
  amount,
  from,
  to,
}: {
  amount: string;
  from: string;
  to: string;
}) {
  const validCurrencyCode = /^[a-zA-Z]{3,}$/; // regex for a 3-letter currency code

  // Validate to currency
  if (!validCurrencyCode.test(to)) {
    throw new CustomError("Invalid to currency", 400);
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new CustomError("Invalid amount", 400);
  }
}

export { validateConversionInput };
