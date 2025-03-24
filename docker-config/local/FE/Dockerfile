FROM node:18

WORKDIR /app

COPY package*.json ./

COPY ./FE_doc_ai ./

RUN npm install

COPY ./docker-config/local/FE/frontend_start.sh  /app/frontend_start.sh
RUN chmod 777 /app/frontend_start.sh

# CMD ["npm", "run", "start"]

CMD ["sh", "-c", "chmod +x /app/frontend_start.sh && ./frontend_start.sh"]
