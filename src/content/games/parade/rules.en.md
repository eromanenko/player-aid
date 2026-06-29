---
title: "Parade"
players: "2-6"
time: "30"
bggId: 56692
---

## Setup
The first player is chosen randomly, and play proceeds clockwise. The first player shuffles the deck and deals 5 cards face down to each player. Another 6 cards are placed face up in a line in the middle of the table. These are the initial participants of the parade. The remaining deck is placed face down at one end of the line to mark the start of the parade. The other end is the end of the parade.

## Gameplay
On a turn, a player performs the following actions in order:
1. **Play a card:** Choose a card from your hand and place it at the end of the parade. This card is not counted when determining positions in the next step.
2. **Remove cards from the parade (if necessary):** If the number of cards already in the parade is *less than or equal to* the value of the played card, no cards are removed. If it is *greater*, some cards must leave the parade.
   - To determine which cards might leave, count positions from the end of the parade towards the start, ignoring the card just played.
   - Any card with a position number **greater** than the value of the played card is vulnerable to removal.
   - From these vulnerable cards, remove: all cards of the **same color** as the played card, and all cards with a **value less than or equal to** the played card. (If a 0 is played, all cards are vulnerable since all positions are > 0).
   - Removed cards are placed face up in front of the player, sorted by color (fanned out so values are visible).
   - The remaining cards in the parade slide forward towards the start to close any gaps.
3. **Draw a card:** Draw one card from the deck to bring your hand back to 5 cards.

## End of Game
The final round is triggered when a player has collected cards of all 6 colors, or when the draw deck is exhausted:
- **6 colors collected:** The active player finishes their turn as normal. Then, every player (including the one who collected the 6th color) plays one more turn. Players *do not draw* a card from the deck during these final turns. After this round, the game ends. If other players collect the 6th color during this final round, it has no additional effect.
- **Deck exhausted:** Every player plays one more turn. The game ends when everyone has exactly 4 cards left in their hand.

## Scoring
At the end of the game, each player chooses 2 cards from their hand to discard. The remaining 2 cards are added to the cards already in front of them.
*Note: Each of these 2 cards is either added to an existing color stack or starts a new one.*
Only cards laid out in front of the players are scored. Any cards still in the parade are discarded.
Calculate points for each color separately:
1. **Majority:** Determine who has the most cards of each color. The player(s) with the most cards in a color flip those cards face down. Each face-down card is worth **1 point** (the printed value is ignored).
2. **Other cards:** Players add up the printed values of any of their cards of that color that remain face up. Add the number of face-down cards to this sum for the total.

## Winner
In Wonderland, where everything is a bit upside down, the player with the **lowest** total score wins! In case of a tie, the tied player with the fewest total cards in front of them (face up and face down combined) is the winner.
