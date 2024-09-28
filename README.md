## Description

The5ers application. This application has responsive design and can be viewed on computers, tablets & mobile devices.

## Installation

### Download
Clone the repository: `git clone https://github.com/mici37000/the5ers.git`.

### Back end installation
1. Set terminal to the5ers server directory: `cd ./the5ers/server`.
2. Install npm modules `npm install`.

### Front end installation
1. Set terminal to the5ers client directory: `cd ./the5ers/client`.
2. Install npm modules `npm install`.

## Running the app

### Back end
1. Set terminal to the5ers server directory: `cd ./the5ers/server`.
2. Edit `.env.development` file upon your DB host and DB name. In case you want to run the system in production mode, you can add `.env.prod` file.
3. Start local server: `npm run start:dev`.
4. Optional - Import example data into your MongoDB `stocks` collection from `stocks-data.json` file.

### Front end
1. Set terminal to the5ers client directory: `cd ./the5ers/client`.
2. Start local server: `npm run dev`.
3. Navigate to: <http://localhost:3001>.
