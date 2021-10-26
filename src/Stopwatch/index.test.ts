import { Test } from "@anderjason/tests";
import { Stopwatch } from ".";
import { Duration } from "..";

Test.define("Stopwatch can be created", () => {
  const stopwatch = new Stopwatch("test");

  Test.assert(stopwatch != null);
});

Test.define("Stopwatch can be started multiple times", async () => {
  const stopwatch = new Stopwatch("test");

  const first = stopwatch.start("apple");
  const second = stopwatch.start("apple");

  const seconds = 0.4;
  await Duration.givenSeconds(seconds).toDelay();

  first.stop();
  second.stop();

  const duration = stopwatch.getDuration("apple");

  // two simultaneous timer instances are added together
  Test.assert(Math.abs(duration.toSeconds() - (seconds * 2)) < 0.05);
});

Test.define("Stopwatch instances can only be stopped once", async () => {
  const stopwatch = new Stopwatch("test");

  const first = stopwatch.start("apple");
  await Duration.givenSeconds(0.2).toDelay();
  first.stop();
  first.stop();
  first.stop();

  const duration = stopwatch.getDuration("apple");

  Test.assert(Math.abs(duration.toSeconds() - 0.2) < 0.05);
});

// Test.define("Stopwatch can report", async () => {
//   const stopwatch = new Stopwatch("test");

//   const first = stopwatch.start("apple");
//   const second = stopwatch.start("banana");

//   await Duration.givenSeconds(0.5).toDelay();

//   first.stop();
//   second.stop();

//   stopwatch.report();
// });