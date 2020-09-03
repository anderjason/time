import { Test } from "@anderjason/tests";
import { Instant } from ".";
import { Duration } from "../Duration";

Test.define("Instant can be created from the current time", () => {
  const nowMs = new Date().getTime();
  const instant = Instant.ofNow();

  const delta = Math.abs(instant.toEpochMilliseconds() - nowMs);
  Test.assert(delta < 5);
});

Test.define("Instant can be created from an epoch milliseconds value", () => {
  const instant = Instant.givenEpochMilliseconds(1586569500000);
  Test.assert(instant.toEpochMilliseconds() === 1586569500000);
});

Test.define("Instant can be converted to a native date", () => {
  const instant = Instant.givenEpochMilliseconds(1586484305000);
  const date = instant.toNativeDate();

  Test.assert(date.toUTCString() === "Fri, 10 Apr 2020 02:05:05 GMT");
});

Test.define("Instant can be converted to a string", () => {
  const instant = Instant.givenEpochMilliseconds(1586569500000);
  Test.assert(instant.toString() === "1586569500000");
});

Test.define("Instant can add a duration", () => {
  const instant = Instant.givenEpochMilliseconds(1586484305000);
  const result = instant.withAddedDuration(Duration.givenMinutes(3));
  const date = result.toNativeDate();

  Test.assert(date.toUTCString() === "Fri, 10 Apr 2020 02:08:05 GMT");
});
