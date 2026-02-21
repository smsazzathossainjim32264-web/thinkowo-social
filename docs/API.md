# Think OwO API Documentation

## Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

## Users
- `GET /api/users/me`
- `PATCH /api/users/me`
- `POST /api/users/:id/follow`
- `DELETE /api/users/:id/follow`

## Posts
- `GET /api/posts`
- `GET /api/posts/trending`
- `POST /api/posts`
- `POST /api/posts/:id/comment`

## Messaging
- `GET /api/messages/:userId`
- `POST /api/messages/:userId`

## Wallet / OwO Coin
- `GET /api/wallet/me`
- `POST /api/wallet/transfer`
- `POST /api/wallet/mint` (admin)

## Subscriptions
- `POST /api/subscriptions/change-tier`

## Admin
- `GET /api/admin/stats`
- `GET /api/admin/reports`
- `PATCH /api/admin/users/:id/verify`

## Real-time Socket Events
- `join` -> subscribe to user room
- `typing` -> typing indicator
- `message:seen` -> seen receipt
- `notify` -> notifications
