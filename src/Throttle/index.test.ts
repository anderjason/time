import { Test } from "@anderjason/tests";
import { Throttle } from ".";
import { Duration } from "../Duration";

Test.define(
  "Throttle only invokes a callback for the first input within the specified duration",
  async () => {
    const invokedValues: string[] = [];

    const throttleDuration = Duration.givenMilliseconds(50);

    const throttle = new Throttle<string>({
      duration: throttleDuration,
      fn: (input: string) => {
        invokedValues.push(input);
      },
    });

    throttle.invoke("red");
    throttle.invoke("orange"); // blocked
    throttle.invoke("yellow"); // blocked

    // invoked once
    Test.assert(invokedValues.length === 1);
    Test.assert(invokedValues[0] === "red");

    // wait a while
    await throttleDuration.withAddedMilliseconds(50).toDelay();

    throttle.invoke("green");

    // did invoke twice
    Test.assert(invokedValues.length === 2);
    Test.assert(invokedValues[0] === "red");
    Test.assert(invokedValues[1] === "green");
  }
);
