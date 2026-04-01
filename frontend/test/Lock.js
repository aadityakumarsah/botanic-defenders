/**
 * Botanic Defenders - Integrated Test Suite
 * Tests merged backend + frontend functionality
 */

const fs = require("fs");
const path = require("path");

console.log("🌱 Running Botanic Defenders Test Suite\n");

const tests = [];
let passed = 0;
let failed = 0;

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

// Test 1: Check environment variables
test("Environment variables should be configured", () => {
  const envFile = path.join(__dirname, "../.env.local");
  assert(fs.existsSync(envFile), ".env.local file should exist");

  const envContent = fs.readFileSync(envFile, "utf-8");
  assert(
    envContent.includes("GEMINI_API_KEY"),
    "GEMINI_API_KEY should be set"
  );
});

// Test 2: Check API routes exist
test("API routes should be created", () => {
  const predictRoute = path.join(
    __dirname,
    "../app/api/plant-health/predict/route.ts"
  );
  const healthRoute = path.join(__dirname, "../app/api/health/route.ts");

  assert(fs.existsSync(predictRoute), "Predict route should exist");
  assert(fs.existsSync(healthRoute), "Health check route should exist");
});

// Test 3: Check route contains Gemini integration
test("Predict route should integrate Gemini API", () => {
  const predictRoute = path.join(
    __dirname,
    "../app/api/plant-health/predict/route.ts"
  );
  const content = fs.readFileSync(predictRoute, "utf-8");

  assert(
    content.includes("GoogleGenerativeAI"),
    "Should use GoogleGenerativeAI"
  );
  assert(
    content.includes("analyzeImageWithGemini"),
    "Should have analyzeImageWithGemini function"
  );
  assert(
    content.includes("gemini-1.5-flash"),
    "Should use correct Gemini model"
  );
});

// Test 4: Check package.json has test script
test("package.json should have test script", () => {
  const packageJsonPath = path.join(__dirname, "../package.json");
  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf-8")
  );

  assert(packageJson.scripts.test, "Test script should exist");
  assert(
    packageJson.scripts.test.includes("test/Lock.js"),
    "Test script should run Lock.js"
  );
});

// Test 5: Check Next.js configuration
test("Next.js should be properly configured", () => {
  const nextConfigPath = path.join(__dirname, "../next.config.mjs");
  const tsconfigPath = path.join(__dirname, "../tsconfig.json");

  assert(fs.existsSync(nextConfigPath), "next.config.mjs should exist");
  assert(fs.existsSync(tsconfigPath), "tsconfig.json should exist");
});

// Test 6: Check API route structure
test("API route should have proper TypeScript types", () => {
  const predictRoute = path.join(
    __dirname,
    "../app/api/plant-health/predict/route.ts"
  );
  const content = fs.readFileSync(predictRoute, "utf-8");

  assert(
    content.includes("NextRequest"),
    "Should import NextRequest"
  );
  assert(
    content.includes("NextResponse"),
    "Should import NextResponse"
  );
  assert(
    content.includes("export async function POST"),
    "Should export POST handler"
  );
});

// Test 7: Check error handling
test("API route should have error handling", () => {
  const predictRoute = path.join(
    __dirname,
    "../app/api/plant-health/predict/route.ts"
  );
  const content = fs.readFileSync(predictRoute, "utf-8");

  assert(
    content.includes("try"),
    "Should have try-catch"
  );
  assert(
    content.includes("catch"),
    "Should have error handling"
  );
  assert(
    content.includes("console.error"),
    "Should log errors"
  );
});

// Test 8: Check response format
test("API should return correct response format", () => {
  const predictRoute = path.join(
    __dirname,
    "../app/api/plant-health/predict/route.ts"
  );
  const content = fs.readFileSync(predictRoute, "utf-8");

  assert(
    content.includes("success"),
    "Response should include success field"
  );
  assert(
    content.includes("predictions"),
    "Response should include predictions"
  );
  assert(
    content.includes("remedy_info"),
    "Response should include remedy_info"
  );
});

// Test 9: Check Image file validation
test("API should validate image files", () => {
  const predictRoute = path.join(
    __dirname,
    "../app/api/plant-health/predict/route.ts"
  );
  const content = fs.readFileSync(predictRoute, "utf-8");

  assert(
    content.includes("image/"),
    "Should check for image file type"
  );
  assert(
    content.includes("startsWith"),
    "Should validate file type"
  );
});

// Test 10: Check base64 encoding
test("API should properly encode images", () => {
  const predictRoute = path.join(
    __dirname,
    "../app/api/plant-health/predict/route.ts"
  );
  const content = fs.readFileSync(predictRoute, "utf-8");

  assert(
    content.includes("arrayBuffer"),
    "Should convert to array buffer"
  );
  assert(
    content.includes("base64"),
    "Should encode as base64"
  );
});

// Run all tests
console.log("Running tests...\n");

tests.forEach(({ name, fn }) => {
  try {
    fn();
    console.log(`✅ PASS: ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ FAIL: ${name}`);
    console.log(`   Error: ${error.message}\n`);
    failed++;
  }
});

// Print summary
console.log("\n" + "=".repeat(50));
console.log(`\n📊 Test Results:`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Total: ${tests.length}\n`);

if (failed === 0) {
  console.log("🎉 All tests passed! Ready for deployment.\n");
  process.exit(0);
} else {
  console.log("⚠️  Some tests failed. Please fix the issues above.\n");
  process.exit(1);
}

// Legacy: Lock test description for compatibility
describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const { lock, lockedAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await ethers.provider.getBalance(lock.target)).to.equal(
        lockedAmount
      );
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      // We don't use the fixture here because we want a different deployment
      const latestTime = await time.latest();
      const Lock = await ethers.getContractFactory("Lock");
      await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        "Unlock time should be in the future"
      );
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });
});
