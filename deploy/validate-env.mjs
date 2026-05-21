const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const key = process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY;
if (!key) {
  fail("NEXT_SERVER_ACTIONS_ENCRYPTION_KEY is required.");
}

let bytes;
try {
  bytes = Buffer.from(key, "base64");
} catch {
  fail("NEXT_SERVER_ACTIONS_ENCRYPTION_KEY must be a valid base64 string.");
}

if (![16, 24, 32].includes(bytes.length)) {
  fail("NEXT_SERVER_ACTIONS_ENCRYPTION_KEY must decode to 16, 24, or 32 bytes.");
}
