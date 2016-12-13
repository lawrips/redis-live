FROM node:4-onbuild
EXPOSE 9999
RUN npm run compile
CMD ["node", "server"]
