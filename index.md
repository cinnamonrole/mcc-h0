<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MCC Fitness Leaderboard</title>
    <link rel="icon" type="image/x-icon" href="icon.png">
    <style>
        /* Global Reset & Base */
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            background-color: #121212;
            color: #e0e0e0;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .container {
            width: 100%;
            max-width: 500px;
            background: #1e1e1e;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
            padding: 25px;
            text-align: center;
        }

        h1,
        h2,
        h3 {
            color: #f5f5f5;
            margin-top: 0;
        }

        h1 {
            margin-bottom: 24px;
        }

        h2 {
            margin-bottom: 20px;
        }

        h3 {
            margin-bottom: 16px;
        }

        .panel {
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: center;
        }

        .hidden {
            display: none;
        }

        .leaderboard {
            list-style: none;
            padding: 0;
            width: 100%;
        }

        .leaderboard li {
            padding: 15px;
            margin: 10px 0;
            background: #2d2d2d;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
        }

        .leaderboard li:hover {
            background-color: #383838;
            transform: translateY(-2px);
        }

        .leaderboard li .score {
            font-weight: bold;
            color: #b0b0b0;
        }

        .leaderboard li.gold {
            background: linear-gradient(90deg, rgba(212, 175, 55, 0.25) 0%, #2d2d2d 60%);
            border-left: 5px solid #D4AF37;
        }

        .leaderboard li.silver {
            background: linear-gradient(90deg, rgba(192, 192, 192, 0.20) 0%, #2d2d2d 60%);
            border-left: 5px solid #C0C0C0;
        }

        .leaderboard li.bronze {
            background: linear-gradient(90deg, rgba(205, 127, 50, 0.25) 0%, #2d2d2d 60%);
            border-left: 5px solid #CD7F32;
        }

        button {
            padding: 12px 20px;
            border-radius: 8px;
            border: none;
            background: #1976D2;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            width: 100%;
            max-width: 300px;
            margin: 5px 0;
            text-align: center;
        }

        button:disabled {
            background-color: #555;
            cursor: not-allowed;
        }

        button:hover:not(:disabled) {
            background: #1565C0;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        button:active:not(:disabled) {
            transform: translateY(0px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.5);
        }

        .button-group button.back-home,
        .button-group button.back-to-menu,
        .button-group button.back-to-leaderboard,
        #score-input-menu .button-group button:last-child,
        #verify-email-panel .button-group button {
            background-color: #3e3e3e;
            color: #d0d0d0;
            font-weight: normal;
        }

        #verify-email-panel .button-group button#resend-verification-button {
            background: #1976D2;
            color: white;
            font-weight: bold;
        }


        .button-group button.back-home:hover:not(:disabled),
        .button-group button.back-to-menu:hover:not(:disabled),
        .button-group button.back-to-leaderboard:hover:not(:disabled),
        #score-input-menu .button-group button:last-child:hover:not(:disabled),
        #verify-email-panel .button-group button:hover:not(:disabled) {
            background-color: #4a4a4a;
            color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        #verify-email-panel .button-group button#resend-verification-button:hover:not(:disabled) {
            background: #1565C0;
        }


        .button-group button.back-home:focus,
        .button-group button.back-to-menu:focus,
        .button-group button.back-to-leaderboard:focus,
        #score-input-menu .button-group button:last-child:focus,
        #verify-email-panel .button-group button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(100, 100, 100, 0.5);
        }

        #verify-email-panel .button-group button#resend-verification-button:focus {
            box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.5);
        }


        .button-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            align-items: center;
        }

        .button-group.vertical {
            gap: 15px;
        }

        input,
        select,
        textarea {
            width: 100%;
            max-width: 300px;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #383838;
            background: #2d2d2d;
            color: #e0e0e0;
            font-size: 16px;
            margin: 5px 0;
            font-family: inherit;
            transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        input:focus,
        select:focus,
        textarea:focus {
            outline: none;
            border-color: #1976D2;
            box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.4);
        }

        select {
            appearance: none;
            background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5z%22%20fill%3D%22%23e0e0e0%22/%3E%3C/svg%3E');
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 16px;
            padding-right: 30px;
        }

        .error {
            color: #ef5350;
            margin: 10px 0;
            font-weight: bold;
        }

        .success-message {
            color: #4CAF50;
            margin: 10px 0;
            font-weight: bold;
        }

        .rules-content {
            text-align: center;
            background: #2a2a2a;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 18px;
            line-height: 1.8;
            width: 100%;
        }

        .rules-content p {
            margin: 15px 0;
        }

        .note {
            font-style: italic;
            color: #a0a0a0;
            margin-top: 25px !important;
        }

        .chat-container {
            height: 400px;
            width: 100%;
            overflow-y: auto;
            border: 1px solid #333;
            border-radius: 8px;
            margin-bottom: 15px;
            background: #252525;
            padding: 20px;
            display: flex;
            flex-direction: column;
        }

        #chat-messages {
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: 100%;
            flex-grow: 1;
            list-style: none;
            padding: 0;
        }

        #chat-messages li {
            background: #3d3d3d;
            padding: 12px 15px;
            border-radius: 8px;
            word-wrap: break-word;
            max-width: 100%;
            font-size: 16px;
        }

        .message-header {
            font-weight: bold;
            margin-bottom: 8px;
            color: #64b5f6;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
        }

        .message-sender {
            font-weight: bold;
        }

        .message-time {
            color: #909090;
            font-size: 0.8em;
        }

        .message-body {
            padding: 8px 0;
            font-size: 16px;
            line-height: 1.5;
        }

        .message-body strong {
            color: #81c784;
        }


        .chat-input-container {
            display: flex;
            gap: 5%;
            width: 100%;
            align-items: center;
        }

        #chat-input {
            flex: 1;
            border-radius: 8px;
            background: #2d2d2d;
            color: #ffffff;
            font-size: 16px;
            resize: none;
            height: 100px;
            width: 100%;
            line-height: 1.5;
            overflow-y: auto;
        }

        #send-button {
            height: 100px;
            width: 30%;
            margin: 0;
            flex-shrink: 0;
        }

        #send-button:hover:not(:disabled),
        #send-button:active:not(:disabled) {
            transform: none;
        }

        .profile-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .profile-header {
            text-align: center;
            padding: 20px;
            background: #2a2a2a;
            border-radius: 8px;
        }

        #profile-username {
            color: #f5f5f5;
        }

        #profile-total-score {
            font-weight: bold;
            color: #81c784;
        }

        .profile-stats-container {
            display: flex;
            gap: 15px;
            width: 100%;
            flex-direction: column;
            /* Default to column for smaller screens */
        }

        .stat-box {
            flex: 1;
            background: #2d2d2d;
            border-radius: 8px;
            padding: 15px;
            max-height: 300px;
            overflow-y: auto;
        }

        .stat-box h3 {
            margin-top: 0;
            margin-bottom: 10px;
            border-bottom: 1px solid #444;
            padding-bottom: 10px;
            color: #e0e0e0;
        }

        .stat-item {
            background: #3d3d3d;
            padding: 10px 12px;
            border-radius: 6px;
            margin-bottom: 10px;
        }

        .stat-item:last-child {
            margin-bottom: 0;
        }

        .message-image {
            max-width: 100%;
            max-height: 200px;
            border-radius: 6px;
            margin-top: 10px;
            cursor: pointer;
            transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
        }

        .message-image:hover {
            transform: scale(1.03);
            opacity: 0.9;
        }

        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.92);
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
        }

        .close {
            position: absolute;
            top: 20px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.2s ease-in-out;
        }

        .close:hover {
            color: #bbbbbb;
        }

        .leaderboard .name {
            cursor: pointer;
            color: #64b5f6;
            text-decoration: none;
            transition: color 0.2s ease-in-out, text-decoration 0.2s ease-in-out;
        }

        .leaderboard .name:hover {
            color: #42a5f5;
            text-decoration: underline;
        }

        .activity-type {
            font-weight: bold;
            color: #4dd0e1;
        }

        .activity-value {
            font-weight: bold;
            color: #fff;
        }

        .activity-date {
            color: #a0a0a0;
            font-size: 0.9em;
        }

        #view-profile-button {
            margin-top: 20px;
            background: #4CAF50;
        }

        #view-profile-button:hover:not(:disabled) {
            background: #43a047;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        #view-profile-button:focus {
            box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.5);
        }

        .admin-button {
            background: #e53935;
        }

        .admin-button:hover:not(:disabled) {
            background: #d32f2f;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .admin-button:focus {
            box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.5);
        }

        .click-counter {
            font-size: 24px;
            margin: 20px 0;
            color: #f5f5f5;
        }

        .file-upload-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            width: 100%;
            max-width: 300px;
            margin: 5px 0;
        }

        .hidden-file-input {
            display: none;
        }

        .custom-file-upload-button {
            display: inline-block;
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid #1976D2;
            background: transparent;
            color: #64b5f6;
            font-size: 16px;
            font-weight: normal;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out, transform 0.2s ease-in-out;
            text-align: center;
            width: 100%;
        }

        .custom-file-upload-button:hover {
            background: rgba(25, 118, 210, 0.1);
            border-color: #42a5f5;
            color: #42a5f5;
            transform: translateY(-1px);
        }

        .custom-file-upload-button:focus {
            outline: none;
            border-color: #1565C0;
            box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.4);
            color: #1565C0;
        }

        .file-name-display {
            font-size: 14px;
            color: #a0a0a0;
            margin-top: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        }

        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }

        ::-webkit-scrollbar-track {
            background: #222;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: #555;
            border-radius: 10px;
            border: 2px solid #222;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #777;
        }

        #verify-email-panel p {
            line-height: 1.6;
        }

        #verify-email-panel #verification-email-address {
            word-break: break-all;
        }

        /* New Styles for Challenge Info */
        .challenge-info {
            background-color: #2a2a2a;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        .challenge-info p {
            margin: 8px 0;
            font-size: 16px;
            color: #e0e0e0;
        }

        .challenge-info strong {
            color: #81c784;
            font-size: 1.1em;
        }


        @media (max-width: 500px) {
            body {
                padding: 10px;
            }

            .container {
                padding: 20px;
            }

            .chat-container {
                height: 350px;
                padding: 15px;
            }

            .rules-content {
                padding: 15px;
                font-size: 16px;
            }

            .leaderboard li {
                padding: 12px;
                font-size: 16px;
            }

            .profile-stats-container {
                flex-direction: column;
                /* This is already the default, but explicit for clarity */
            }
        }
    </style>
</head>

<body>
    <div id="imageModal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="modalImage">
    </div>

    <div class="container">
        <div id="password-panel" class="panel">
            <h1>MCC Fitness Leaderboard</h1>
            <img src="icon.png" alt="MCC Fitness Icon" style="max-width: 100px; margin-bottom: 20px;">
            <div class="form-group button-group">
                <button id="signup-button">New User Signup</button>
                <button id="existing-login-button">Existing User Login</button>
                <button id="guest-leaderboard-button">View Leaderboards (Guest)</button>
            </div>
        </div>

        <div id="signup-panel" class="panel hidden">
            <h2>Sign Up</h2>
            <input type="text" id="name-input" placeholder="Name" autocomplete="name">
            <input type="email" id="email-input" placeholder="Email" autocomplete="email">
            <input type="password" id="password-input" placeholder="Password" autocomplete="new-password">
            <input type="password" id="confirm-password-input" placeholder="Confirm Password"
                autocomplete="new-password">
            <p id="signup-message" class="error"></p>
            <div class="button-group">
                <button id="submit-signup-button">Sign Up</button>
                <button class="back-home">Back</button>
            </div>
        </div>

        <div id="user-login-panel" class="panel hidden">
            <h2>User Login</h2>
            <input type="email" id="login-email-input" placeholder="Email" autocomplete="email">
            <input type="password" id="login-user-password-input" placeholder="Password"
                autocomplete="current-password">
            <p id="user-login-error-message" class="error"></p>
            <div class="button-group">
                <button id="submit-user-login-button">Login</button>
                <button class="back-home">Back</button>
            </div>
        </div>

        <div id="verify-email-panel" class="panel hidden">
            <h2>Verify Your Email</h2>
            <p>A verification email has been sent to <strong
                    id="verification-email-address">your_email@example.com</strong>.</p>
            <p>Please check your inbox (and spam folder) and click the verification link to activate your account.</p>
            <p>If you don't see the email, you can resend it or contact Minh Tran or Ethan Hoffman.</p>
            <p id="resend-verification-message" class="error"></p>
            <div class="button-group vertical">
                <button id="resend-verification-button">Resend Verification Email</button>
                <button id="check-verification-status-button">I've Verified, Continue</button>
                <button id="back-to-login-from-verify-button">Logout & Go to Login</button>
            </div>
        </div>

        <div id="menu-panel" class="panel hidden">
            <h2>Welcome, <span id="current-user-display"></span>!</h2>
             <div class="challenge-info">
                <p>Days Left in Challenge: <strong id="days-left-counter">--</strong></p>
                <p>Team Total: <strong id="team-total-meters">0 / 20,000,000 m</strong></p>
            </div>
            <div class="button-group vertical">
                <button id="rules-button">Rules</button>
                <button id="add-workout-score-button">Add Workout Score</button>
                <button id="leaderboard-button">Leaderboards</button>
                <button id="chat-button">Group Chat</button>
                <button id="view-profile-button">View My Profile</button>
                <button class="back-home">Logout</button>
            </div>
        </div>

        <div id="leaderboard-menu-panel" class="panel hidden">
            <h2>Leaderboards</h2>
            <div class="button-group vertical">
                <button id="all-workouts-button">All Workouts Leaderboard</button>
                 <button id="daily-leaderboard-button">Daily Leaderboard</button>
                <button id="erging-button">Erging Leaderboard</button>
                <button id="running-button">Running Leaderboard</button>
                <button id="biking-button">Biking Leaderboard</button>
                <button id="swimming-button">Swimming Leaderboard</button>
                <button id="lifting-button">Lifting Leaderboard</button>
                <button id="otw-rowing-button">OTW Rowing Leaderboard</button>
                <button class="back-to-menu">Back to Main Menu</button> <button id="back-to-home-from-leaderboard-guest"
                    class="hidden">Back to Login</button> </div>
        </div>

        <div id="all-workouts-panel" class="panel hidden">
            <h2>All Workouts Leaderboard</h2>
            <ul id="all-workouts-list" class="leaderboard"></ul>
            <div class="button-group">
                <button class="back-to-leaderboard">Back</button>
            </div>
        </div>
        
        <div id="daily-leaderboard-panel" class="panel hidden">
            <h2>Daily Leaderboard</h2>
            <ul id="daily-leaderboard-list" class="leaderboard"></ul>
            <div class="button-group">
                <button class="back-to-leaderboard">Back</button>
            </div>
        </div>

        <div id="erging-panel" class="panel hidden">
            <h2>Erging Leaderboard</h2>
            <ul id="erging-list" class="leaderboard"></ul>
            <div class="button-group">
                <button class="back-to-leaderboard">Back</button>
            </div>
        </div>

        <div id="running-panel" class="panel hidden">
            <h2>Running Leaderboard</h2>
            <ul id="running-list" class="leaderboard"></ul>
            <div class="button-group">
                <button class="back-to-leaderboard">Back</button>
            </div>
        </div>

        <div id="biking-panel" class="panel hidden">
            <h2>Biking Leaderboard</h2>
            <ul id="biking-list" class="leaderboard"></ul>
            <div class="button-group">
                <button class="back-to-leaderboard">Back</button>
            </div>
        </div>

        <div id="swimming-panel" class="panel hidden">
            <h2>Swimming Leaderboard</h2>
            <ul id="swimming-list" class="leaderboard"></ul>
            <div class="button-group">
                <button class="back-to-leaderboard">Back</button>
            </div>
        </div>

        <div id="lifting-panel" class="panel hidden">
            <h2>Lifting Leaderboard</h2>
            <ul id="lifting-list" class="leaderboard"></ul>
            <div class="button-group">
                <button class="back-to-leaderboard">Back</button>
            </div>
        </div>

        <div id="otw-rowing-panel" class="panel hidden">
            <h2>OTW Rowing Leaderboard</h2>
            <ul id="otw-rowing-list" class="leaderboard"></ul>
            <div class="button-group">
                <button class="back-to-leaderboard">Back</button>
            </div>
        </div>

        <div id="rules-panel" class="panel hidden">
            <h2>Competition Rules</h2>
            <div class="rules-content">
                <p>1000 Meter Erg = 1000 Meters</p>
                <p>300 Meter Swim = 1000 Meters</p>
                <p>1 Mile Run = 1000 Meters</p>
                <p>2 Mile Bike = 1000 Meters</p>
                <p>1 Lift = 5000 Meters</p>
                <p>1000 Meter 1x/2- OTW = 1000 Meter</p>
                <p>2000 Meter 2x OTW = 1000 Meter</p>
                <p class="note">More may be added later!</p>
            </div>
            <div class="button-group">
                <button class="back-to-menu">Back to Menu</button> <button id="back-to-home-from-rules-guest"
                    class="hidden">Back to Login</button> </div>
        </div>

        <div id="score-input-menu" class="panel hidden">
            <h2>Add Workout Score</h2>
            <h4 style="margin:0px;font-weight:lighter;">Your workout submissions will be reviewed for accuracy!</h4>
            <select id="activity-select">
                <option value="">Select Activity</option>
                <option value="Erg">Erging</option>
                <option value="Run">Running</option>
                <option value="Bike">Biking</option>
                <option value="Swim">Swimming</option>
                <option value="Lift">Lifting</option>
                <option value="OTW">OTW Rowing</option>
            </select>
            <input type="number" id="points-input" placeholder="Meters (based on rules)">
            <div class="file-upload-wrapper">
                <input type="file" id="photo-upload" accept="image/*" class="hidden-file-input" multiple>
                <label for="photo-upload" class="custom-file-upload-button">Choose Photo(s)</label>
                <span id="file-name-display" class="file-name-display">No file chosen</span>
            </div>
            <div class="button-group">
                <button id="confirm-score-button">Submit Score</button>
                <button class="back-to-menu">Cancel</button>
            </div>
        </div>

        <div id="chat-panel" class="panel hidden">
            <h2>Group Chat</h2>
            <div class="chat-container">
                <ul id="chat-messages"></ul>
            </div>
            <div class="chat-input-container">
                <textarea id="chat-input" placeholder="Type your message here..." rows="3"></textarea>
                <button id="send-button">Send</button>
            </div>
            <div class="button-group" style="margin-top: 15px;">
                <button class="back-to-menu">Back to Menu</button>
            </div>
        </div>

        <div id="profile-panel" class="panel hidden">
            <div class="profile-container">
                <div class="profile-header">
                    <h2 id="profile-username">Username</h2>
                    <p>Total Score: <span id="profile-total-score">0</span> m</p>
                </div>

                <div class="profile-stats-container">
                    <div class="stat-box">
                        <h3>Highest Scores</h3>
                        <div id="highest-scores">
                        </div>
                    </div>

                    <div class="stat-box">
                        <h3>Recent Activities</h3>
                        <div id="recent-activities">
                        </div>
                    </div>

                    <div class="stat-box">
                        <h3>Activity Totals</h3>
                        <div id="activity-totals">
                        </div>
                    </div>
                </div>

                <div class="button-group">
                    <button class="back-to-menu">Back to Main Menu</button>
                    <button id="back-to-leaderboard-from-profile-guest" class="back-to-leaderboard hidden">Back to
                        Leaderboard</button>
                </div>
            </div>
        </div>

        <div id="admin-password-panel" class="panel hidden">
            <h2>Admin Access</h2>
            <input type="password" id="admin-password-input" placeholder="Enter Admin Password">
            <p id="admin-error-message" class="error"></p>
            <div class="button-group">
                <button id="submit-admin-password-button">Submit</button>
                <button class="back-to-menu">Back</button>
            </div>
        </div>

        <div id="admin-control-panel" class="panel hidden">
            <h2>Admin Controls</h2>
            <input type="text" id="admin-username-input" placeholder="Username">
            <input type="number" id="admin-points-input" placeholder="Value to add/subtract">
            <div class="button-group">
                <button id="admin-add-points-button">Add Value</button>
                <button id="admin-subtract-points-button" class="admin-button">Subtract Value</button>
                <button class="back-to-menu">Back to Menu</button>
            </div>
        </div>

        <div id="super-admin-password-panel" class="panel hidden">
            <h2>Super Admin Access</h2>
            <input type="password" id="super-admin-password-input" placeholder="Enter Super Admin Password">
            <p id="super-admin-error-message" class="error"></p>
            <div class="button-group">
                <button id="submit-super-admin-password-button">Submit</button>
                <button class="back-to-menu">Back</button>
            </div>
        </div>

        <div id="super-admin-panel" class="panel hidden">
            <h2>Super Admin Controls</h2>
            <div class="click-counter">Clicks: <span id="click-count">0</span>/100</div>
            <div class="button-group vertical">
                <button id="wipe-confirm-button" class="hidden admin-button">Wipe All Score Data</button>
                <button id="undo-wipe-button" class="hidden">Undo Wipe (Disabled for Cloud)</button>
                <button id="click-button">Click Me</button>
                <button class="back-to-menu">Back to Menu</button>
            </div>
        </div>
    </div>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
        import {
            getAuth,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            onAuthStateChanged,
            signOut,
            sendEmailVerification
        } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
        import {
            getFirestore,
            doc,
            setDoc,
            getDoc,
            addDoc,
            collection,
            query,
            where,
            getDocs,
            orderBy,
            Timestamp,
            updateDoc,
            arrayUnion,
            onSnapshot,
            writeBatch
        } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
        import {
            getStorage,
            ref,
            uploadBytes,
            getDownloadURL
        } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";

        // IMPORTANT: Replace with your actual Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDbL_-yIxKgL_6lu0TOWZpGuF3KeT7iluo", 
            authDomain: "mcc-summer-leaderboard.firebaseapp.com",
            projectId: "mcc-summer-leaderboard",
            storageBucket: "mcc-summer-leaderboard.firebasestorage.app",
            messagingSenderId: "376614411221",
            appId: "1:376614411221:web:9afe27edc84cf5de3b7b5c",
            measurementId: "G-SKPNS56ZDN"
        };

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app); // Optional
        const auth = getAuth(app);
        const db = getFirestore(app);
        const storage = getStorage(app);

        let currentFirebaseUser = null;
        let currentAppUsername = null;
        let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
        let typedWord = '';
        let unsubscribeChat = null;

        // Helper function to show a custom alert-like modal
        function showCustomAlert(message) {
            // For simplicity, using browser's alert. Replace with a custom modal in a real app.
            alert(message);
        }

        function updateChallengeInfo() {
            // Days Left Countdown
            const daysLeftEl = document.getElementById('days-left-counter');
            if (daysLeftEl) {
                const now = new Date();
                const endDate = new Date(now.getFullYear(), 8, 5); // August 31st
                const diffTime = Math.max(0, endDate.getTime() - now.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                daysLeftEl.textContent = diffDays;
            }

            // Team Total Meters
            updateTeamTotal();
        }

        async function updateTeamTotal() {
            const teamTotalEl = document.getElementById('team-total-meters');
            if (!teamTotalEl) return;

            teamTotalEl.textContent = 'Calculating...';
            const usersRef = collection(db, "users");
            const querySnapshot = await getDocs(usersRef);

            let grandTotal = 0;
            querySnapshot.forEach(docSnap => {
                const userData = docSnap.data();
                if (userData.activities && Array.isArray(userData.activities)) {
                    grandTotal += userData.activities.reduce((sum, a) => sum + (Number(a.points) || 0), 0);
                }
            });
            
            const goal = 20000000;
            teamTotalEl.textContent = `${grandTotal.toLocaleString()} / ${goal.toLocaleString()} m`;
        }


        function show(panelId) {
            const panelsRequiringLogin = [
                'menu-panel', 'verify-email-panel', 'score-input-menu', 'chat-panel',
                'admin-password-panel', 'admin-control-panel', 'super-admin-password-panel', 'super-admin-panel'
            ];
            const panelsRequiringVerification = [ // These require login AND verification
                'score-input-menu', 'chat-panel'
                 // Note: 'menu-panel' itself doesn't require verification, but features within it might.
                 // Profile panel is now viewable by guests.
            ];

            let newPanelId = panelId;

            // Determine if the "Back to Login" or "Back to Menu" button should be shown in leaderboard/rules panels
            const backToHomeFromLeaderboardGuestBtn = document.getElementById('back-to-home-from-leaderboard-guest');
            const backToHomeFromRulesGuestBtn = document.getElementById('back-to-home-from-rules-guest');
            const backToMenuBtnInLeaderboard = document.querySelector('#leaderboard-menu-panel .back-to-menu');
            const backToMenuBtnInRules = document.querySelector('#rules-panel .back-to-menu');


            if (!currentFirebaseUser) { // Guest user
                if (panelsRequiringLogin.includes(panelId)) {
                    showCustomAlert("You need to be logged in to access this page.");
                    newPanelId = 'password-panel';
                }
                // For guests, show "Back to Login" on leaderboard/rules
                if (backToHomeFromLeaderboardGuestBtn) backToHomeFromLeaderboardGuestBtn.classList.toggle('hidden', panelId !== 'leaderboard-menu-panel');
                if (backToMenuBtnInLeaderboard) backToMenuBtnInLeaderboard.classList.toggle('hidden', panelId === 'leaderboard-menu-panel');

                if (backToHomeFromRulesGuestBtn) backToHomeFromRulesGuestBtn.classList.toggle('hidden', panelId !== 'rules-panel');
                if (backToMenuBtnInRules) backToMenuBtnInRules.classList.toggle('hidden', panelId === 'rules-panel');

            } else { // Logged-in user
                if (!currentFirebaseUser.emailVerified && panelsRequiringVerification.includes(panelId)) {
                    showCustomAlert("Please verify your email to access this feature.");
                    newPanelId = 'verify-email-panel';
                    const verificationEmailEl = document.getElementById('verification-email-address');
                    if (verificationEmailEl) verificationEmailEl.textContent = currentFirebaseUser.email;
                }
                // For logged-in users, show "Back to Menu"
                if (backToHomeFromLeaderboardGuestBtn) backToHomeFromLeaderboardGuestBtn.classList.add('hidden');
                if (backToMenuBtnInLeaderboard) backToMenuBtnInLeaderboard.classList.remove('hidden');

                if (backToHomeFromRulesGuestBtn) backToHomeFromRulesGuestBtn.classList.add('hidden');
                if (backToMenuBtnInRules) backToMenuBtnInRules.classList.remove('hidden');
            }


            document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
            const panelToShow = document.getElementById(newPanelId);
            if (panelToShow) {
                panelToShow.classList.remove('hidden');
            } else {
                console.warn(`Panel with ID ${newPanelId} not found. Defaulting to password-panel.`);
                const passwordPanel = document.getElementById('password-panel');
                if (passwordPanel) passwordPanel.classList.remove('hidden');
            }

            if (newPanelId === 'menu-panel') {
                updateChallengeInfo();
            }

            if (newPanelId !== 'chat-panel' && unsubscribeChat) {
                unsubscribeChat();
                unsubscribeChat = null;
            } else if (newPanelId === 'chat-panel') {
                if (currentFirebaseUser && currentFirebaseUser.emailVerified) {
                    renderMessages();
                }
            }
        }

        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImage");
        const spanClose = document.getElementsByClassName("close")[0];

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('message-image')) {
                if(modal && modalImg) {
                    modal.style.display = "flex";
                    modalImg.src = e.target.src;
                }
            }
        });
        if(spanClose) {
            spanClose.onclick = function () { if(modal) modal.style.display = "none"; }
        }
        window.onclick = function (event) {
            if (event.target == modal && modal) { modal.style.display = "none"; }
        }

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                currentFirebaseUser = user;
                await user.reload(); // Ensure latest emailVerified status
                currentFirebaseUser = auth.currentUser; // Re-assign after reload

                if (!currentFirebaseUser.emailVerified) {
                    const verificationEmailEl = document.getElementById('verification-email-address');
                    if (verificationEmailEl) verificationEmailEl.textContent = currentFirebaseUser.email;
                    currentAppUsername = null;
                    const currentUserDisplayEl = document.getElementById('current-user-display');
                    if (currentUserDisplayEl) currentUserDisplayEl.textContent = '';
                    show('verify-email-panel');
                    if (unsubscribeChat) { unsubscribeChat(); unsubscribeChat = null; }
                } else {
                    const userRef = doc(db, "users", currentFirebaseUser.uid);
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        currentAppUsername = docSnap.data().username;
                        const currentUserDisplayEl = document.getElementById('current-user-display');
                        if (currentUserDisplayEl) currentUserDisplayEl.textContent = currentAppUsername;

                        const activePanel = document.querySelector('.panel:not(.hidden)');
                        // If user was on a login/signup/verify panel, move to menu
                        if (!activePanel || ['password-panel', 'signup-panel', 'user-login-panel', 'verify-email-panel'].includes(activePanel.id)) {
                            show('menu-panel');
                        }
                        updateAllLeaderboards(); // Update leaderboards for logged-in, verified user
                    } else {
                        console.error("User data not found in Firestore for UID:", currentFirebaseUser.uid);
                        showCustomAlert("Could not find your user profile. Logging out.");
                        await signOut(auth); // This will trigger onAuthStateChanged again
                    }
                }
            } else { // No user logged in (guest state or after logout)
                currentFirebaseUser = null;
                currentAppUsername = null;
                const currentUserDisplayEl = document.getElementById('current-user-display');
                if (currentUserDisplayEl) currentUserDisplayEl.textContent = '';

                if (unsubscribeChat) {
                    unsubscribeChat();
                    unsubscribeChat = null;
                }

                const activePanel = document.querySelector('.panel:not(.hidden)');
                const guestAllowedPanels = [
                    'password-panel', 'signup-panel', 'user-login-panel', // Auth panels
                    'rules-panel', // Public info
                    'leaderboard-menu-panel', 'all-workouts-panel', 'erging-panel', // Leaderboards
                    'running-panel', 'biking-panel', 'swimming-panel',
                    'lifting-panel', 'otw-rowing-panel', 'daily-leaderboard-panel',
                    'profile-panel' // Profile panel is now guest-accessible
                ];

                // If current panel is not guest-allowed, or no panel is active, show login
                if (!activePanel || !guestAllowedPanels.includes(activePanel.id)) {
                    show('password-panel');
                } else {
                    // If on a guest-allowed panel, ensure correct back buttons are shown
                    show(activePanel.id);
                }
            }
        });

        function updateAllLeaderboards() {
            // This function can be called by guests or logged-in users.
            // Firestore rules must allow reading the necessary data for leaderboards.
            updateLeaderboard('all-workouts-list', 'total');
            updateLeaderboard('erging-list', 'Erg');
            updateLeaderboard('running-list', 'Run');
            updateLeaderboard('biking-list', 'Bike');
            updateLeaderboard('swimming-list', 'Swim');
            updateLeaderboard('lifting-list', 'Lift');
            updateLeaderboard('otw-rowing-list', 'OTW');
            updateDailyLeaderboard();
        }

        async function updateDailyLeaderboard() {
            const listId = 'daily-leaderboard-list';
            const list = document.getElementById(listId);
            if (!list) return;

            list.innerHTML = '<li>Loading...</li>';

            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

            const startOfDayTimestamp = Timestamp.fromDate(startOfDay);
            const endOfDayTimestamp = Timestamp.fromDate(endOfDay);
            
            const usersRef = collection(db, "users");
            const querySnapshot = await getDocs(usersRef);

            let leaderboardData = [];
            querySnapshot.forEach(docSnap => {
                const userData = docSnap.data();
                if (userData.activities && Array.isArray(userData.activities)) {
                    const dailyScore = userData.activities
                        .filter(a => a.date && a.date >= startOfDayTimestamp && a.date <= endOfDayTimestamp)
                        .reduce((sum, a) => sum + (Number(a.points) || 0), 0);

                    if (dailyScore > 0) {
                        leaderboardData.push({ name: userData.username, score: dailyScore, uid: docSnap.id });
                    }
                }
            });

            leaderboardData.sort((a, b) => b.score - a.score);
            list.innerHTML = ''; // Clear loading

            if (leaderboardData.length === 0) {
                list.innerHTML = `<li>No meters recorded today yet.</li>`;
            } else {
                leaderboardData.forEach((user, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class="name" data-username="${user.name}" data-uid="${user.uid}">${user.name}</span>
                        <span class="score">${user.score.toLocaleString()} m</span>`;
                    if (index === 0) li.classList.add('gold');
                    else if (index === 1) li.classList.add('silver');
                    else if (index === 2) li.classList.add('bronze');
                    list.appendChild(li);
                });
            }
             document.querySelectorAll(`#${listId} .name`).forEach(el => {
                el.addEventListener('click', (e) => {
                    const username = e.target.getAttribute('data-username');
                    const userUID = e.target.getAttribute('data-uid');
                    showUserProfile(userUID, username);
                });
            });
        }


        async function updateLeaderboard(listId, activityType) {
            const list = document.getElementById(listId);
            if (!list) {
                console.error(`Leaderboard list element with ID ${listId} not found.`);
                return;
            }
            list.innerHTML = '<li>Loading...</li>'; // Initial loading state

            const usersRef = collection(db, "users");
            let querySnapshot;
            try {
                // Note: For guests to see this, Firestore rules need to allow reads on "users" collection
                // or at least the fields needed for the leaderboard (username, activities).
                querySnapshot = await getDocs(usersRef);
            } catch (error) {
                console.error("Error fetching users for leaderboard: ", error);
                list.innerHTML = '<li>Error loading leaderboard data. Check Firestore rules or console.</li>';
                return;
            }

            let leaderboardData = [];
            querySnapshot.forEach((docSnap) => {
                const userData = docSnap.data();
                const userName = userData.username;
                let scoreValue = 0;

                if (userData.activities && Array.isArray(userData.activities)) {
                    if (activityType === 'total') {
                        scoreValue = userData.activities.reduce((sum, a) => sum + (Number(a.points) || 0), 0);
                    } else {
                        scoreValue = userData.activities
                            .filter(a => a.activity === activityType)
                            .reduce((sum, a) => sum + (Number(a.points) || 0), 0);
                    }
                }
                // Only add if score > 0, unless it's the "total" leaderboard where 0 is fine if they exist
                if (scoreValue > 0 || (activityType === 'total' && userName)) {
                     leaderboardData.push({ name: userName, score: scoreValue, uid: docSnap.id });
                }
            });

            leaderboardData.sort((a, b) => b.score - a.score);
            list.innerHTML = ''; // Clear loading/previous data

            if (leaderboardData.length === 0) {
                list.innerHTML = `<li>No scores recorded for this ${activityType === 'total' ? 'category' : activityType} yet.</li>`;
            } else {
                leaderboardData.forEach((user, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class="name" data-username="${user.name}" data-uid="${user.uid}">${user.name}</span>
                        <span class="score">${user.score.toLocaleString()} m</span>`;
                    if (index === 0) li.classList.add('gold');
                    else if (index === 1) li.classList.add('silver');
                    else if (index === 2) li.classList.add('bronze');
                    list.appendChild(li);
                });
            }

            document.querySelectorAll(`#${listId} .name`).forEach(el => {
                el.addEventListener('click', (e) => {
                    const username = e.target.getAttribute('data-username');
                    const userUID = e.target.getAttribute('data-uid');
                    showUserProfile(userUID, username);
                });
            });
        }

        async function showUserProfile(userUID, usernameToDisplay) {
            // This function is now accessible to guests.
            const userRef = doc(db, "users", userUID);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                console.error("User profile not found for UID:", userUID);
                showCustomAlert("Could not load user profile.");
                return;
            }

            const user = docSnap.data();
            const displayName = usernameToDisplay || user.username;

            const profileUsernameEl = document.getElementById('profile-username');
            if(profileUsernameEl) profileUsernameEl.textContent = displayName;

            const activities = user.activities || [];
            const totalOverallScoreValue = activities.reduce((sum, a) => sum + (Number(a.points) || 0), 0);
            const profileTotalScoreEl = document.getElementById('profile-total-score');
            if(profileTotalScoreEl) profileTotalScoreEl.textContent = totalOverallScoreValue.toLocaleString();

            const highestScores = {};
            const totalsByActivityScore = {};
            const allActivityTypes = ['Erg', 'Run', 'Bike', 'Swim', 'Lift', 'OTW'];

            allActivityTypes.forEach(activity => {
                highestScores[activity] = 0;
                totalsByActivityScore[activity] = 0;
            });

            activities.forEach(workout => {
                const activityName = workout.activity || 'Unknown';
                const currentScoreValue = Number(workout.points) || 0;

                if (allActivityTypes.includes(activityName)) { // Only process known types
                    if (currentScoreValue > highestScores[activityName]) {
                        highestScores[activityName] = currentScoreValue;
                    }
                    totalsByActivityScore[activityName] += currentScoreValue;
                }
            });

            const highestScoresContainer = document.getElementById('highest-scores');
            if(highestScoresContainer) {
                highestScoresContainer.innerHTML = allActivityTypes.map(act => `
                    <div class="stat-item">
                        <span class="activity-type">${act}:</span>
                        <span class="activity-value">${(highestScores[act] || 0).toLocaleString()} m</span>
                    </div>
                `).join('');
            }


            const recentActivitiesContainer = document.getElementById('recent-activities');
            if(recentActivitiesContainer) {
                if (activities.length > 0) {
                     const renderWorkoutImages = (workout) => {
                        let imagesHTML = '';
                        if (workout.images && Array.isArray(workout.images)) {
                            imagesHTML = workout.images.map(url => `<img src="${url}" class="message-image" alt="Workout image">`).join('');
                        } else if (workout.image) { // Backward compatibility
                            imagesHTML = `<img src="${workout.image}" class="message-image" alt="Workout image">`;
                        }
                        return imagesHTML;
                    };

                    recentActivitiesContainer.innerHTML = activities
                        .slice() // Create a copy before sorting
                        .sort((a, b) => (b.date && a.date) ? b.date.toMillis() - a.date.toMillis() : 0)
                        .slice(0, 10) // Get top 10 recent
                        .map(workout => `
                        <div class="stat-item">
                            <div>
                                <span class="activity-type">${workout.activity}:</span>
                                <span class="activity-value">${(Number(workout.points) || 0).toLocaleString()} m</span>
                            </div>
                            <div class="activity-date">${workout.date ? workout.date.toDate().toLocaleString() : 'N/A'}</div>
                            ${renderWorkoutImages(workout)}
                        </div>
                    `).join('');
                } else {
                    recentActivitiesContainer.innerHTML = '<div class="stat-item">No activities yet</div>';
                }
            }


            const activityTotalsContainer = document.getElementById('activity-totals');
            if(activityTotalsContainer) {
                activityTotalsContainer.innerHTML = allActivityTypes.map(act => `
                    <div class="stat-item">
                        <span class="activity-type">${act}:</span>
                        <span class="activity-value">${(totalsByActivityScore[act] || 0).toLocaleString()} m</span>
                    </div>
                `).join('');
            }
            
            // Toggle visibility of back buttons based on user login state
            const backToMenuBtn = document.querySelector('#profile-panel .back-to-menu');
            const backToLeaderboardBtn = document.getElementById('back-to-leaderboard-from-profile-guest');

            if (!currentFirebaseUser) { // Guest is viewing
                if(backToMenuBtn) backToMenuBtn.classList.add('hidden');
                if(backToLeaderboardBtn) backToLeaderboardBtn.classList.remove('hidden');
            } else { // Logged-in user is viewing
                if(backToMenuBtn) backToMenuBtn.classList.remove('hidden');
                if(backToLeaderboardBtn) backToLeaderboardBtn.classList.add('hidden');
            }

            show('profile-panel');
        }

        function renderMessages() {
            if (!currentFirebaseUser || !currentFirebaseUser.emailVerified) {
                if (unsubscribeChat) { unsubscribeChat(); unsubscribeChat = null; }
                return;
            }
            if (unsubscribeChat) { unsubscribeChat(); } // Unsubscribe from previous listener

            const ul = document.getElementById('chat-messages');
            if (!ul) return;

            const messagesRef = collection(db, "messages");
            const qMessages = query(messagesRef, orderBy("time", "asc"));

            unsubscribeChat = onSnapshot(qMessages, (querySnapshot) => {
                ul.innerHTML = ''; // Clear previous messages
                querySnapshot.forEach((docSnap) => {
                    const m = docSnap.data();
                    const li = document.createElement('li');
                    const content = document.createElement('div');
                    content.className = 'message-content';

                    const header = document.createElement('div');
                    header.className = 'message-header';
                    header.innerHTML = `
                        <span class="message-sender">${m.user || 'Anonymous'}</span>
                        <span class="message-time">${m.time ? m.time.toDate().toLocaleString() : 'N/A'}</span>`;
                    content.appendChild(header);

                    const body = document.createElement('div');
                    body.className = 'message-body';
                    if (m.text) {
                        body.textContent = m.text;
                    } else if (m.activity && typeof m.points !== 'undefined') {
                        body.innerHTML = `Added <strong>${m.points.toLocaleString()} m</strong> from <strong>${m.activity}</strong>`;
                    }
                    content.appendChild(body);

                    // Handle one or multiple images
                    if (m.images && Array.isArray(m.images)) {
                        m.images.forEach(url => {
                            const img = document.createElement('img');
                            img.src = url;
                            img.alt = "Chat image";
                            img.className = 'message-image';
                            content.appendChild(img);
                        });
                    } else if (m.image) { // For backward compatibility
                        const img = document.createElement('img');
                        img.src = m.image;
                        img.alt = "Chat image";
                        img.className = 'message-image';
                        content.appendChild(img);
                    }
                    li.appendChild(content);
                    ul.appendChild(li);
                });
                const chatContainer = document.querySelector('.chat-container');
                if (chatContainer) {
                    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
                }
            }, (error) => {
                console.error("Error fetching chat messages: ", error);
                if(ul) ul.innerHTML = '<li>Error loading chat.</li>';
            });
        }


        document.addEventListener('DOMContentLoaded', () => {
            const signupMessageEl = document.getElementById('signup-message');

            document.getElementById('signup-button').addEventListener('click', () => {
                if(signupMessageEl) {
                    signupMessageEl.textContent = '';
                    signupMessageEl.className = 'error';
                }
                show('signup-panel');
            });
            document.getElementById('existing-login-button').addEventListener('click', () => show('user-login-panel'));
            document.getElementById('guest-leaderboard-button').addEventListener('click', () => {
                updateAllLeaderboards(); // Pre-fetch data
                show('leaderboard-menu-panel');
            });
             document.getElementById('back-to-home-from-leaderboard-guest').addEventListener('click', () => show('password-panel'));
             document.getElementById('back-to-home-from-rules-guest').addEventListener('click', () => show('password-panel'));


            document.querySelectorAll('.back-home').forEach(btn => {
                btn.addEventListener('click', async () => {
                    try {
                        if (auth.currentUser) { await signOut(auth); } // Triggers onAuthStateChanged
                        else { show('password-panel'); }
                    } catch (error) {
                        console.error("Sign out error:", error); show('password-panel');
                    }
                });
            });

            document.querySelectorAll('.back-to-menu').forEach(btn => btn.addEventListener('click', () => show('menu-panel')));
            document.querySelectorAll('.back-to-leaderboard').forEach(btn => btn.addEventListener('click', () => show('leaderboard-menu-panel')));

            document.getElementById('rules-button').addEventListener('click', () => show('rules-panel')); // Rules can be public
            document.getElementById('add-workout-score-button').addEventListener('click', () => show('score-input-menu'));
            document.getElementById('leaderboard-button').addEventListener('click', () => { updateAllLeaderboards(); show('leaderboard-menu-panel'); });

            document.getElementById('chat-button').addEventListener('click', () => show('chat-panel'));
            document.getElementById('view-profile-button').addEventListener('click', () => {
                if (currentFirebaseUser && currentFirebaseUser.emailVerified && currentAppUsername) {
                    showUserProfile(currentFirebaseUser.uid, currentAppUsername);
                } else {
                    show('verify-email-panel'); // Or password-panel if not logged in
                }
            });

            document.getElementById('all-workouts-button').addEventListener('click', () => { updateLeaderboard('all-workouts-list', 'total'); show('all-workouts-panel'); });
            document.getElementById('daily-leaderboard-button').addEventListener('click', () => { updateDailyLeaderboard(); show('daily-leaderboard-panel'); });
            document.getElementById('erging-button').addEventListener('click', () => { updateLeaderboard('erging-list', 'Erg'); show('erging-panel'); });
            document.getElementById('running-button').addEventListener('click', () => { updateLeaderboard('running-list', 'Run'); show('running-panel'); });
            document.getElementById('biking-button').addEventListener('click', () => { updateLeaderboard('biking-list', 'Bike'); show('biking-panel'); });
            document.getElementById('swimming-button').addEventListener('click', () => { updateLeaderboard('swimming-list', 'Swim'); show('swimming-panel'); });
            document.getElementById('lifting-button').addEventListener('click', () => { updateLeaderboard('lifting-list', 'Lift'); show('lifting-panel'); });
            document.getElementById('otw-rowing-button').addEventListener('click', () => { updateLeaderboard('otw-rowing-list', 'OTW'); show('otw-rowing-panel'); });


            document.getElementById('submit-signup-button').addEventListener('click', async () => {
                const signupButton = document.getElementById('submit-signup-button');
                const nameInput = document.getElementById('name-input');
                const emailInput = document.getElementById('email-input');
                const passwordInput = document.getElementById('password-input');
                const confirmPasswordInput = document.getElementById('confirm-password-input');

                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const pw = passwordInput.value;
                const confirmPw = confirmPasswordInput.value;

                if(signupMessageEl) { signupMessageEl.textContent = ''; signupMessageEl.className = 'error'; }


                if (!name || !email || !pw) { if(signupMessageEl) signupMessageEl.textContent = "Please fill all fields"; return; }
                if (pw !== confirmPw) { if(signupMessageEl) signupMessageEl.textContent = "Passwords don't match"; return; }
                if (pw.length < 6) { if(signupMessageEl) signupMessageEl.textContent = "Password should be at least 6 characters"; return; }

                signupButton.disabled = true; signupButton.textContent = 'Signing Up...';

                try {
                    const usersRefTest = collection(db, "users");
                    const qTest = query(usersRefTest, where("username", "==", name));
                    const querySnapshotTest = await getDocs(qTest);

                    if (!querySnapshotTest.empty) {
                        if(signupMessageEl) signupMessageEl.textContent = "This name is already taken.";
                        signupButton.disabled = false; signupButton.textContent = 'Sign Up'; return;
                    }

                    const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
                    const newUser = userCredential.user;
                    await setDoc(doc(db, "users", newUser.uid), {
                        username: name, email: email, activities: [], createdAt: Timestamp.now()
                    });
                    await sendEmailVerification(newUser);

                    [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => input.value = '');
                    if(signupMessageEl) {
                        signupMessageEl.textContent = 'Signup successful! Verification email sent.';
                        signupMessageEl.className = 'success-message';
                    }
                } catch (error) {
                    if(signupMessageEl){
                        if (error.code === 'auth/email-already-in-use') signupMessageEl.textContent = "Email already in use.";
                        else if (error.code === 'auth/invalid-email') signupMessageEl.textContent = "Invalid email.";
                        else signupMessageEl.textContent = "Signup failed: " + error.message;
                    }
                    console.error("Signup error:", error);
                } finally {
                    signupButton.disabled = false; signupButton.textContent = 'Sign Up';
                }
            });

            document.getElementById('submit-user-login-button').addEventListener('click', async () => {
                const loginButton = document.getElementById('submit-user-login-button');
                const emailInput = document.getElementById('login-email-input');
                const passwordInput = document.getElementById('login-user-password-input');
                const loginErrorEl = document.getElementById('user-login-error-message');

                const email = emailInput.value.trim();
                const pw = passwordInput.value;
                if(loginErrorEl) loginErrorEl.textContent = '';

                if (!email || !pw) { if(loginErrorEl) loginErrorEl.textContent = "Enter email and password."; return; }

                loginButton.disabled = true; loginButton.textContent = 'Logging In...';
                try {
                    await signInWithEmailAndPassword(auth, email, pw);
                    // onAuthStateChanged will handle navigation
                } catch (error) {
                    if(loginErrorEl){
                        if (['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential'].includes(error.code)) loginErrorEl.textContent = "Invalid email or password.";
                        else if (error.code === 'auth/invalid-email') loginErrorEl.textContent = "Invalid email format.";
                        else loginErrorEl.textContent = "Login failed. Try again.";
                    }
                    console.error("Login error:", error);
                } finally {
                    loginButton.disabled = false; loginButton.textContent = 'Login';
                }
            });

            const photoUploadInput = document.getElementById('photo-upload');
            const fileNameDisplay = document.getElementById('file-name-display');
            if (photoUploadInput && fileNameDisplay) {
                photoUploadInput.addEventListener('change', function() {
                    if (this.files && this.files.length > 1) {
                        fileNameDisplay.textContent = `${this.files.length} files chosen`;
                    } else if (this.files && this.files.length === 1) {
                        fileNameDisplay.textContent = this.files[0].name;
                    } else {
                        fileNameDisplay.textContent = 'No file chosen';
                    }
                });
            }

            document.getElementById('confirm-score-button').addEventListener('click', async () => {
                if (!currentFirebaseUser || !currentFirebaseUser.emailVerified) {
                    showCustomAlert("Please verify your email to add workout scores.");
                    show('verify-email-panel');
                    return;
                }

                const confirmButton = document.getElementById('confirm-score-button');
                const pointsInputEl = document.getElementById('points-input');
                const activitySelect = document.getElementById('activity-select');
                const photoUpload = document.getElementById('photo-upload');
                const currentFileNameDisplay = document.getElementById('file-name-display');

                const activity = activitySelect.value;
                const pointsVal = parseInt(pointsInputEl.value);
                const files = photoUpload.files;

                if (!activity) { showCustomAlert("Please select an activity."); return; }
                if (isNaN(pointsVal) || pointsVal <= 0) { showCustomAlert("Please enter a valid positive value for your score."); return; }
                if (!files || files.length === 0) { showCustomAlert("An image upload is required as proof for your workout."); return; }

                confirmButton.disabled = true; confirmButton.textContent = 'Submitting...';

                try {
                    const uploadPromises = Array.from(files).map(file => {
                        const storageRef = ref(storage, `workout_images/${currentFirebaseUser.uid}/${Date.now()}_${file.name}`);
                        return uploadBytes(storageRef, file).then(snapshot => getDownloadURL(snapshot.ref));
                    });
                    const imageUrls = await Promise.all(uploadPromises);

                    const workoutData = {
                        activity,
                        points: pointsVal,
                        date: Timestamp.now(),
                        images: imageUrls
                    };

                    const userRef = doc(db, "users", currentFirebaseUser.uid);
                    await updateDoc(userRef, { activities: arrayUnion(workoutData) });

                    await addDoc(collection(db, "messages"), {
                        userId: currentFirebaseUser.uid,
                        user: currentAppUsername,
                        activity: workoutData.activity,
                        points: workoutData.points,
                        images: workoutData.images,
                        time: Timestamp.now()
                    });

                    updateAllLeaderboards();
                    updateTeamTotal(); // Update the team total immediately
                    show('menu-panel');

                    pointsInputEl.value = '';
                    activitySelect.value = '';
                    photoUpload.value = null;
                    if (currentFileNameDisplay) currentFileNameDisplay.textContent = 'No file chosen';
                    showCustomAlert("Workout score submitted successfully!");

                } catch (error) {
                    console.error("Add workout error: ", error);
                    showCustomAlert("Failed to add workout score. Please check the console and try again.");
                } finally {
                    confirmButton.disabled = false;
                    confirmButton.textContent = 'Submit Score';
                }
            });

            document.getElementById('send-button').addEventListener('click', async () => {
                if (!currentFirebaseUser || !currentFirebaseUser.emailVerified) {
                    showCustomAlert("Please verify your email to send messages.");
                    show('verify-email-panel');
                    return;
                }
                const chatInputEl = document.getElementById('chat-input');
                const text = chatInputEl.value.trim();
                if (!text || !currentAppUsername) return;

                try {
                    await addDoc(collection(db, "messages"), {
                        userId: currentFirebaseUser.uid, user: currentAppUsername,
                        text: text, time: Timestamp.now()
                    });
                    chatInputEl.value = '';
                } catch (error) {
                    console.error("Send msg error: ", error); showCustomAlert("Failed to send message.");
                }
            });

            const chatInputElement = document.getElementById('chat-input');
            if (chatInputElement) {
                 chatInputElement.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        const sendButton = document.getElementById('send-button');
                        if(sendButton) sendButton.click();
                    }
                });
            }


            const resendVerificationButton = document.getElementById('resend-verification-button');
            const resendMessageEl = document.getElementById('resend-verification-message');

            if(resendVerificationButton) {
                resendVerificationButton.addEventListener('click', async () => {
                    if (currentFirebaseUser) {
                        resendVerificationButton.disabled = true; resendVerificationButton.textContent = 'Sending...';
                        if(resendMessageEl) { resendMessageEl.textContent = ''; resendMessageEl.className = 'error'; }

                        try {
                            await sendEmailVerification(currentFirebaseUser);
                            if(resendMessageEl) {
                                resendMessageEl.textContent = 'Verification email resent. Check inbox/spam.';
                                resendMessageEl.className = 'success-message';
                            }
                            setTimeout(() => {
                                resendVerificationButton.disabled = false; resendVerificationButton.textContent = 'Resend Email';
                            }, 30000); // 30 second cooldown
                        } catch (error) {
                            console.error("Resend email error:", error);
                            if(resendMessageEl) resendMessageEl.textContent = error.code === 'auth/too-many-requests' ? 'Too many requests. Try later.' : 'Failed to resend. Try again.';
                            resendVerificationButton.disabled = false; resendVerificationButton.textContent = 'Resend Email';
                        }
                    } else {
                        if(resendMessageEl) resendMessageEl.textContent = 'No user logged in.';
                        show('password-panel');
                    }
                });
            }


            document.getElementById('check-verification-status-button').addEventListener('click', async () => {
                if (currentFirebaseUser) {
                    const button = document.getElementById('check-verification-status-button');
                    button.disabled = true; button.textContent = "Checking...";
                    await currentFirebaseUser.reload();
                    currentFirebaseUser = auth.currentUser; // Refresh user object
                    button.disabled = false; button.textContent = "I've Verified, Continue";

                    if (currentFirebaseUser.emailVerified) {
                        // onAuthStateChanged should handle the navigation to menu-panel if logic is correct
                        // but we can also try to explicitly show it
                        const userRef = doc(db, "users", currentFirebaseUser.uid);
                        const docSnap = await getDoc(userRef);
                        if (docSnap.exists()) {
                            currentAppUsername = docSnap.data().username;
                            const currentUserDisplayEl = document.getElementById('current-user-display');
                            if(currentUserDisplayEl) currentUserDisplayEl.textContent = currentAppUsername;
                            show('menu-panel');
                            updateAllLeaderboards();
                        } else {
                             console.error("User data not found after verification check:", currentFirebaseUser.uid);
                             showCustomAlert("Profile not found. Logging out.");
                             await signOut(auth);
                        }
                    } else {
                        showCustomAlert('Email still not verified. Check inbox/spam or resend.');
                    }
                } else {
                    show('password-panel');
                }
            });

            document.getElementById('back-to-login-from-verify-button').addEventListener('click', async () => {
                if(resendMessageEl) resendMessageEl.textContent = '';
                if (auth.currentUser) { await signOut(auth); }
                else { show('password-panel'); }
            });

            // Admin and Super Admin related event listeners (unchanged from original logic)
            document.addEventListener('keydown', (e) => {
                if (!currentFirebaseUser || !currentFirebaseUser.emailVerified) { typedWord = ''; return; }
                const currentPanel = document.querySelector('.panel:not(.hidden)');
                if (!currentPanel || !['password-panel', 'menu-panel', 'admin-control-panel'].includes(currentPanel.id)) {
                    typedWord = ''; return;
                }
                typedWord += e.key.toLowerCase();
                if (typedWord.includes('awesome')) {
                    typedWord = '';
                    if (['password-panel', 'menu-panel'].includes(currentPanel.id)) show('admin-password-panel');
                    else if (currentPanel.id === 'admin-control-panel') show('super-admin-password-panel');
                }
                if (typedWord.length > 10) typedWord = typedWord.slice(-10);
            });

            document.getElementById('submit-admin-password-button').addEventListener('click', () => {
                const passwordInput = document.getElementById('admin-password-input');
                const adminErrorEl = document.getElementById('admin-error-message');
                const password = passwordInput.value;
                if (password === 'McleanCrew2025!') { // Replace with your actual admin password
                    if(adminErrorEl) adminErrorEl.textContent = '';
                    show('admin-control-panel');
                } else {
                    if(adminErrorEl) adminErrorEl.textContent = 'Incorrect password';
                }
                passwordInput.value = '';
            });

            async function modifyUserScore(addOperation) {
                const usernameToEditInput = document.getElementById('admin-username-input');
                const pointsInput = document.getElementById('admin-points-input');
                const usernameToEdit = usernameToEditInput.value.trim();
                let pointsVal = parseInt(pointsInput.value);
                if (!usernameToEdit || isNaN(pointsVal) || pointsVal === 0) { showCustomAlert('Valid username & non-zero value required.'); return; }
                if (!addOperation) pointsVal = -pointsVal;

                const usersRef = collection(db, "users");
                const q = query(usersRef, where("username", "==", usernameToEdit));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) { showCustomAlert(`User ${usernameToEdit} not found.`); return; }
                const userDocSnap = querySnapshot.docs[0];
                try {
                    await updateDoc(doc(db, "users", userDocSnap.id), {
                        activities: arrayUnion({ activity: 'Admin Adjust', points: pointsVal, date: Timestamp.now() })
                    });
                    updateAllLeaderboards();
                    showCustomAlert(`${addOperation ? 'Added' : 'Subtracted'} ${Math.abs(pointsVal)} (value) ${addOperation ? 'to' : 'from'} ${usernameToEdit}`);
                    usernameToEditInput.value = '';
                    pointsInput.value = '';
                } catch (error) { console.error(`Admin modify score error:`, error); showCustomAlert("Error modifying score."); }
            }
            document.getElementById('admin-add-points-button').addEventListener('click', () => modifyUserScore(true));
            document.getElementById('admin-subtract-points-button').addEventListener('click', () => modifyUserScore(false));

            document.getElementById('submit-super-admin-password-button').addEventListener('click', () => {
                const passwordInput = document.getElementById('super-admin-password-input');
                const superAdminErrorEl = document.getElementById('super-admin-error-message');
                const password = passwordInput.value;
                if (password === 'LukeHoffman2006!') { // Replace with your actual super admin password
                    if(superAdminErrorEl) superAdminErrorEl.textContent = '';
                    show('super-admin-panel');
                    const clickCountEl = document.getElementById('click-count');
                    if(clickCountEl) clickCountEl.textContent = clickCount;
                } else {
                    if(superAdminErrorEl) superAdminErrorEl.textContent = 'Incorrect password';
                }
                passwordInput.value = '';
            });

            document.getElementById('click-button').addEventListener('click', () => {
                clickCount++;
                const clickCountEl = document.getElementById('click-count');
                if(clickCountEl) clickCountEl.textContent = clickCount;
                localStorage.setItem('clickCount', clickCount.toString());
                const wipeButton = document.getElementById('wipe-confirm-button');
                if (clickCount >= 100 && wipeButton) wipeButton.classList.remove('hidden');
            });

            document.getElementById('wipe-confirm-button').addEventListener('click', async () => {
                // Replaced window.confirm with a simple browser confirm for this example.
                // In a real app, use a custom modal for confirmations.
                if (confirm('Are you sure you want to wipe ALL SCORE DATA for ALL users? This is hard to reverse!')) {
                    const usersRef = collection(db, "users");
                    try {
                        const querySnapshot = await getDocs(usersRef);
                        const batch = writeBatch(db);
                        querySnapshot.forEach((docSnap) => batch.update(doc(db, "users", docSnap.id), { activities: [] }));
                        await batch.commit();
                        updateAllLeaderboards(); showCustomAlert('All score data wiped!');
                        const undoWipeButton = document.getElementById('undo-wipe-button');
                        if(undoWipeButton) undoWipeButton.classList.add('hidden');
                        clickCount = 0; localStorage.setItem('clickCount', '0');
                        const clickCountEl = document.getElementById('click-count');
                        if(clickCountEl) clickCountEl.textContent = 0;
                        const wipeButton = document.getElementById('wipe-confirm-button');
                        if(wipeButton) wipeButton.classList.add('hidden');
                    } catch (error) {
                        console.error("Wipe score data error: ", error); showCustomAlert("Failed to wipe score data.");
                    }
                }
            });
            document.getElementById('undo-wipe-button').addEventListener('click', () => showCustomAlert('Client-side undo not available for cloud data. Use Firebase backups.'));

            // Initial panel display logic is handled by onAuthStateChanged
             const initialPanelCheck = () => {
                 if (!auth.currentUser) {
                     const activePanel = document.querySelector('.panel:not(.hidden)');
                     if (!activePanel) { // If no panel is active (e.g., direct load)
                         show('password-panel');
                     }
                 }
             };
             // Give onAuthStateChanged a moment to run first
             setTimeout(initialPanelCheck, 150);

        });
    </script>
</body>

</html>
