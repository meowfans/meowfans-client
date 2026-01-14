name: Bug report
description: Create a report to help us improve
title: "[BUG]: "
labels: ["bug"]
assignees: []

body:

- type: textarea
  id: description
  attributes:
  label: Describe the bug
  description: A clear and concise description of what the bug is.
  placeholder: What went wrong?
  validations:
  required: true

- type: textarea
  id: steps
  attributes:
  label: To Reproduce
  description: Steps to reproduce the behavior
  placeholder: | 1. Go to '...' 2. Click on '...' 3. Scroll down to '...' 4. See error
  validations:
  required: true

- type: textarea
  id: expected
  attributes:
  label: Expected behavior
  description: What you expected to happen.
  validations:
  required: true

- type: textarea
  id: screenshots
  attributes:
  label: Screenshots
  description: If applicable, add screenshots to help explain your problem.

- type: dropdown
  id: desktop_os
  attributes:
  label: Desktop OS
  options: - macOS - Windows - Linux - Other

- type: input
  id: desktop_browser
  attributes:
  label: Desktop Browser
  placeholder: Chrome, Safari, Firefox

- type: input
  id: desktop_version
  attributes:
  label: Browser Version
  placeholder: e.g. 120.0

- type: dropdown
  id: mobile_device
  attributes:
  label: Smartphone Device
  options: - iPhone - Android - Other

- type: input
  id: mobile_os
  attributes:
  label: Mobile OS
  placeholder: e.g. iOS 17, Android 14

- type: textarea
  id: context
  attributes:
  label: Additional context
  description: Add any other context about the problem here.
