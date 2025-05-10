#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== TranslateHub Application Runner ===${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is not installed. Please install Node.js to run this application.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}npm is not installed. Please install npm to run this application.${NC}"
    exit 1
fi

# Display options
echo "Please select an option:"
echo "1. Install dependencies and start development server"
echo "2. Start development server (if dependencies are already installed)"
echo "3. Build for production"
echo "4. Preview production build"
echo "5. Clean cache and reinstall dependencies"
echo "6. Exit"
echo ""

# Read user input
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo -e "${GREEN}Installing dependencies and starting development server...${NC}"
        npm install && npm run dev
        ;;
    2)
        echo -e "${GREEN}Starting development server...${NC}"
        npm run dev
        ;;
    3)
        echo -e "${GREEN}Building for production...${NC}"
        npm run build
        ;;
    4)
        echo -e "${GREEN}Previewing production build...${NC}"
        npm run preview
        ;;
    5)
        echo -e "${GREEN}Cleaning cache and reinstalling dependencies...${NC}"
        rm -rf node_modules/.vite
        rm -rf node_modules
        npm install
        echo -e "${GREEN}Done! You can now start the development server with option 2.${NC}"
        ;;
    6)
        echo -e "${GREEN}Exiting...${NC}"
        exit 0
        ;;
    *)
        echo -e "${YELLOW}Invalid option. Please try again.${NC}"
        exit 1
        ;;
esac