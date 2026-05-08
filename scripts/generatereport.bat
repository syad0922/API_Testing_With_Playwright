@echo off

IF EXIST allure-report\history (
    xcopy /E /I allure-report\history allure-results\history
)

npx allure-commandline generate allure-results --clean

npx allure-commandline open