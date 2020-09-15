import { Test } from "@anderjason/tests";
import { Debounce } from ".";
import { Duration } from "../Duration";
import { Instant } from "../Instant";

Test.define(
  "Debounce invokes a callback after input has stopped for a while",
  async () => {
    const startTime = Instant.ofNow();
    const invokeDurations: Duration[] = [];

    const debounceDuration = Duration.givenMilliseconds(50);

    const debounce = new Debounce({
      duration: debounceDuration,
      fn: () => {
        invokeDurations.push(
          Duration.givenInstantRange(startTime, Instant.ofNow())
        );
      },
    });

    debounce.invoke();
    debounce.invoke();
    debounce.invoke();

    // did not invoke
    Test.assert(invokeDurations.length === 0);

    // wait a while
    await debounceDuration.withAddedMilliseconds(50).toDelay();

    // did invoke once
    Test.assert(invokeDurations.length === 1);

    const actualInvokeDelay = invokeDurations[0].toMilliseconds();
    const delta = Math.abs(
      actualInvokeDelay - debounceDuration.toMilliseconds()
    );

    Test.assert(delta < 10); // within 10ms of the expected delay
  }
);
