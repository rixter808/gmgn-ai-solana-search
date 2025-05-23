# GMGN.AI Solana Search Chrome Extension

![Extension Icon](icon48.png)

This Chrome extension allows users to search Solana wallet addresses (42–44 characters) on [GMGN.AI](https://gmgn.ai) directly from highlighted text or clipboard content. It adds context menu options for quick and easy lookups.

## Features
- **Search Highlighted Text:** Right-click on a selected Solana wallet address and choose "Search on GMGN.AI" to open the address on GMGN.AI.
- **Search Clipboard Content:** Right-click anywhere on a webpage and select "Search Clipboard Address on GMGN.AI" to look up a Solana address from your clipboard.
- **Validation:** Ensures the address is a valid Solana wallet address (42–44 characters, Base58 format) before proceeding.
- **Error Handling:** Displays helpful error messages via a Google search tab if the address is invalid or clipboard access fails.

## Installation
1. **Clone or Download the Repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/gmgn-ai-solana-search.git
