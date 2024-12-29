import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent.click(await screen.findByText("Envoyer"));

      // Wait for the "En cours" message to appear
      await waitFor(() => {
        expect(screen.getByText("En cours")).toBeInTheDocument();
      });

      // Wait for the success message to appear
      await waitFor(() => {
        expect(screen.getByText("Message envoyé !")).toBeInTheDocument();
      });
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  });
  it("a list of people is displayed", () => {
    // to implement
  });
  it("a footer is displayed", () => {
    // to implement
  });
  it("an event card, with the last event, is displayed", () => {
    // to implement
  });
});
