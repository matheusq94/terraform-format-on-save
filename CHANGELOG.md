# Change Log

All notable changes to the "TFS" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.0]
### Feat
- Added support for `tofu`: [OpenTofu](https://opentofu.org/)
### Fix
- Each save was creating a zombie process as the terminal was not reused leading to an os error: posix_spawnp failed\
  It has been improved by creating a single terminal at the extension activation and only if the terminal has been killed.

## [Unreleased]

- Initial release