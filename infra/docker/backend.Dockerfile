FROM node:20-alpine
WORKDIR /app
COPY apps/backend /app
EXPOSE 3001
CMD ["sh", "-c", "node -e \"console.log('Backend container ready. Install deps and run Nest in implementation phase.')\" && tail -f /dev/null"]
