FROM node


WORKDIR /bellfa.art

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3001
EXPOSE 3000

CMD ["node","app.js"]