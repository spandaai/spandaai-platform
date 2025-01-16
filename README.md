# spandaai-platform

## Overview

Welcome to the **spandaai-platform** repository. This repository houses the core components of the SpandaAI ecosystem.

## Documentation

For detailed guides, best practices, and contribution guidelines, please refer to our [Central Documentation](https://github.com/spandaai/spandaai-docs).

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/spandaai/spandaai-platform.git
   ```

2. **Install Dependencies:**

   ```bash
   cd spandaai-platform
   # Follow specific installation instructions here
   ```

3. **Run the Application:**

For Windows 
   ```bash
  ./quickstart.bat
   ```

For Linux/MacOS
   ```bash
  ./quickstart.sh
   ```

## Features

- Feature 1
- Feature 2
- Feature 3


## Migration

# Script Documentation: Repository Introspection and Analysis Tool

## Overview
This Python script automates the introspection and analysis of multiple repositories by:

- Cloning the repositories
- Identifying project types and dependencies
- Detecting external services used in Docker and Kubernetes manifests
- Compiling detailed information about each repository into a JSON report

The purpose of the script is to facilitate repository analysis for understanding their structure, dependencies, frameworks, and configurations in a streamlined manner.

## Dependencies
- **os, sys, shutil, subprocess, re, time**: For file and directory operations, system-level commands, regex, and delays.
- **json, yaml, ast**: For parsing JSON, YAML, and Python AST to extract information.
- **logging, warnings**: For logging and suppressing warnings.
- **ruamel.yaml**: For YAML parsing that preserves structure.
- **git (from GitPython)**: For repository operations like cloning.
- **logging.handlers (RotatingFileHandler)**: To manage log file sizes by rotating them.

## Logging and Warnings Suppression
- **Logging**: The script uses the `logging` module to log important events, including errors and status messages. The log is also configured with rotation (`RotatingFileHandler`) to prevent it from growing indefinitely.
- **Warning Suppression**: Warnings of type `SyntaxWarning` are suppressed to reduce noise from the cloned repositories.

## Main Functionalities

### Repository Cloning
- **`clone_repo()`**: This function clones a Git repository, optionally using SSH or a Personal Access Token (PAT). It supports retrying failed clone attempts.
  - **Parameters**:
    - `repo_url`: URL of the repository to clone.
    - `clone_dir`: Directory where the repository will be cloned.
    - `auth_method` and `auth_token`: Optional authentication support for SSH or PAT.
  - **Return**: Returns `True` if cloning is successful, otherwise `False`.

### Project Identification
- **`identify_project_type()`**: Determines the type of project (e.g., Python, Node.js, Java) based on the presence of specific files (e.g., `requirements.txt`, `package.json`).
  - **Return**: A list of identified project types.

### Dependency Extraction
- **Functions like `extract_python_dependencies()`, `extract_node_dependencies()`, `extract_go_dependencies()`**:
  - These functions extract dependencies from specific configuration files (e.g., `requirements.txt`, `package.json`).
  - **Return**: Dictionary of dependencies.

### Framework Detection
- **`detect_frameworks()`**: Based on the extracted dependencies, identifies commonly used frameworks (e.g., Django, Flask for Python).
  - **Return**: A list of detected frameworks.

### Docker and Kubernetes Analysis
- **`parse_dockerfile()`**: Parses `Dockerfile` to extract information like the base image, exposed ports, environment variables, and volumes.
- **`parse_docker_compose()`**: Parses `docker-compose.yml` to extract service information, environment variables, and dependencies.
- **`parse_kubernetes_manifests()`**: Extracts deployment, service, and other Kubernetes object information from Kubernetes YAML manifests. Helm templating syntax is removed before parsing.

### Dependency Verification
- **`scan_python_imports()` and `scan_nodejs_imports()`**: Scans Python and Node.js files respectively to identify imported modules.
- **`generate_missing_dependencies()`**: Identifies dependencies used in code but not declared in dependency files.

### External Service Detection
- **`detect_external_dependencies()`**: Detects external services (e.g., databases, message brokers, monitoring tools) based on images in Docker Compose or Kubernetes manifests.
  - **Return**: A list of detected external dependencies.

### Directory Mapping
- **`build_directory_tree()`**: Builds a dictionary representing the directory structure of a repository.
- **`map_subfolders()`**: Maps specific subfolders to their components.

### Report Generation
- **`generate_report()`**: Generates a JSON report (`bits_pilani_master_migration_report.json`) containing details of each repository, including dependencies, frameworks, components, and configurations.

### Layer Determination
- **`determine_layer()`**: Determines the layer (Platform, Domain, Application, Management) to which a repository belongs based on a predefined master list.

### Cleanup
- At the end of the script, cloned repositories in the temporary directory are removed to save space.

## Script Flow (`main()`)

### Define Repositories to Analyze
- A `master_list` dictionary defines applications, their repositories (frontend and backend), platform repositories, and domain-specific repositories.

### Initialize Temporary Directory for Cloning
- **Temporary Directory**: `temp_repos_master` is created to store cloned repositories. If it exists from a previous run, it is deleted to start fresh.

### Repository Processing Loop
- For each application in the `master_list`:
  - All unique repositories (frontend, backend, platform, domain-specific) are collected.
  - **Clone Repositories**: Repositories are cloned using `clone_repo()`.
  - **Identify Project Types**: After cloning, `identify_project_type()` is used to determine the project type.
  - **Extract Information**: Extract dependencies, frameworks, Docker, Kubernetes manifests, and more.
  - **Scan for Missing Dependencies**: Cross-check imported modules against declared dependencies.
  - **Determine Layer**: The layer (Platform, Domain, Application, Management) is identified using `determine_layer()`.
  - **Store Information**: Gathered information is stored in `repos_info`.

### Handle Management Repositories
- The script processes management repositories separately.

### Cleanup
- Once all repositories are processed, the temporary directory is deleted to clean up the cloned repositories.

### Generate Report
- The `generate_report()` function writes all collected data to a JSON file named `bits_pilani_master_migration_report.json`.

### Completion Message
- Logs a completion message indicating the end of the introspection process.

## Key Points
- **Retry Mechanism for Cloning**: The script retries cloning up to 3 times with a 5-second delay between attempts if cloning fails.
- **Layer Determination**: Helps organize repositories based on their role (Platform, Domain, Applications, Management).
- **Directory Mapping**: Associates subfolders with their components, which is useful for managing domain-specific projects.
- **Dependency Analysis**: Ensures dependencies used in the code are also declared in the respective configuration files.

## Customization
- **Authentication**: The script can be modified to use either SSH or PAT for cloning private repositories by setting the `auth_method` and `auth_token`.
- **Repository List**: The `master_list` can be updated to add or remove repositories to analyze.
- **Max Directory Depth**: The depth for directory tree traversal can be adjusted using the `max_depth` parameter in `build_directory_tree()`.

## Usage Scenarios
- **Repository Analysis**: To quickly understand the structure and dependencies of various repositories, especially useful for integration and migration tasks.
- **Dependency Management**: Identify missing dependencies and keep dependencies up-to-date.
- **Documentation and Migration**: Useful for documenting existing projects and planning migrations to other systems, such as Kubernetes-based deployments.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](https://github.com/spandaai/spandaai-docs/blob/main/Contributing/README.md) for more information.

## Contact

For questions or support, please reach out to the respective team.

---
