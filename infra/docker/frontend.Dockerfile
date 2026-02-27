FROM node:20-alpine
WORKDIR /app
COPY apps/frontend /app
EXPOSE 3000
CMD ["sh", "-c", "node -e \"console.log('Frontend container ready. Install deps and run Next in implementation phase.')\" && tail -f /dev/null"]
