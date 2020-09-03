import { Test } from "@anderjason/tests";
import "./Duration/index.test";
import "./Instant/index.test";

Test.runAll()
  .then(() => {
    console.log("Tests complete");
  })
  .catch((err) => {
    console.error(err);
    console.error("Tests failed");
  });
