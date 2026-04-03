# Microsoft 인증

Helios Launcher는 Microsoft 인증을 완전히 지원합니다.

## Entra Client ID 획득하기

1. https://portal.azure.com 로 이동합니다.
2. 검색창에서 **Microsoft Entra ID**를 검색합니다.
3. Microsoft Entra ID에서 왼쪽 패널의 **앱 등록**으로 이동합니다 (*관리* 아래).
4. **새 등록**을 클릭합니다.
    - **이름**을 런처 이름으로 설정합니다.
    - **지원되는 계정 유형**을 *조직 디렉터리의 계정(모든 Microsoft Entra ID 테넌트 - 다중 테넌트) 및 개인 Microsoft 계정(예: Skype, Xbox)*으로 설정합니다.
    - **리디렉션 URI**는 비워 둡니다.
    - 애플리케이션을 등록합니다.
5. 애플리케이션 관리 페이지에 있어야 합니다. 그렇지 않다면 **앱 등록**으로 돌아가서 방금 등록한 애플리케이션을 선택합니다.
6. 왼쪽 패널의 **인증**을 클릭합니다 (*관리* 아래).
7. **플랫폼 추가**를 클릭합니다.
    - **모바일 및 데스크톱 애플리케이션**을 선택합니다.
    - **리디렉션 URI**로 `https://login.microsoftonline.com/common/oauth2/nativeclient`를 선택합니다.
    - **구성**을 선택하여 플랫폼 추가를 완료합니다.
8. **인증서 및 암호**로 이동합니다.
    - **클라이언트 암호**를 선택합니다.
    - **새 클라이언트 암호**를 클릭합니다.
    - 설명을 설정합니다.
    - **추가**를 클릭합니다.
    - 클라이언트 암호를 복사하지 마세요. Microsoft의 요구사항일 뿐입니다.
9. **개요**로 돌아갑니다.
10. **애플리케이션(클라이언트) ID**를 복사합니다.

## 게시자 확인 (Publisher Verification)

**중요**: 2020년 11월 9일부터 Microsoft는 확인된 게시자 없이 새로 등록된 다중 테넌트 앱에 대한 최종 사용자 동의를 제한합니다. 게시자 확인을 완료하지 않으면 사용자가 앱에 동의할 수 없습니다.

게시자 확인을 완료하려면:

1. Azure Portal에서 앱 등록 페이지로 이동합니다.
2. 왼쪽 패널에서 **브랜딩**을 클릭합니다 (*관리* 아래).
3. **게시자 도메인** 섹션에서 **MPN ID 추가**를 클릭합니다.
4. Microsoft Partner Network(MPN) ID를 입력합니다.
   - MPN ID가 없다면 [Microsoft Partner Network](https://partner.microsoft.com/)에 등록해야 합니다.
   - MPN ID는 무료로 발급받을 수 있습니다.
5. 저장 후 Microsoft의 확인을 기다립니다 (보통 몇 시간에서 며칠 소요).

참고: 게시자 확인은 선택사항이 아닙니다. 다중 테넌트 앱을 사용하려면 반드시 필요합니다.

## Helios Launcher에 Entra Client ID 추가하기

`app/assets/js/ipcconstants.js` 파일에서 **`AZURE_CLIENT_ID`**를 찾을 수 있습니다. 이를 애플리케이션 ID로 설정합니다.

참고: Entra Client ID는 비밀 값이 아니며 git에 저장할 수 있습니다. 참조: https://stackoverflow.com/questions/57306964/are-azure-active-directorys-tenantid-and-clientid-considered-secrets

그런 다음 앱을 다시 실행하고 로그인합니다. 앱이 아직 화이트리스트에 등록되지 않았기 때문에 오류 메시지가 표시됩니다. Microsoft는 화이트리스트 등록 전에 앱에서 일부 활동이 필요합니다. __화이트리스트 요청 전에 로그인을 시도하는 것은 필수입니다.__

## Microsoft에 화이트리스트 요청하기

1. 이 문서 페이지의 모든 단계를 완료했는지 확인합니다.
2. [이 양식](https://aka.ms/mce-reviewappid)에 필요한 정보를 입력합니다. 이것은 승인을 위한 새로운 appID임을 기억하세요. Azure Portal의 개요 페이지에서 Client ID와 Tenant ID를 모두 찾을 수 있습니다.
3. Microsoft가 앱을 검토할 시간을 줍니다.
4. Microsoft의 승인을 받은 후 변경사항이 적용되는 데 최대 24시간이 걸릴 수 있습니다.

## 문제 해결

### "Invalid app registration" 에러가 발생하는 경우

이 에러는 `https://api.minecraftservices.com/authentication/login_with_xbox`에서 발생하며, 다음을 확인하세요:

1. **앱 등록 확인**
   - Azure Portal에서 앱이 제대로 등록되어 있는지 확인
   - Client ID가 `ipcconstants.js`에 올바르게 설정되어 있는지 확인

2. **게시자 확인 완료 여부**
   - 게시자 확인(Publisher Verification)이 완료되었는지 확인
   - MPN ID가 추가되고 확인되었는지 확인

3. **화이트리스트 요청 완료 여부**
   - [화이트리스트 양식](https://aka.ms/mce-reviewappid)을 제출했는지 확인
   - Microsoft의 승인을 받았는지 확인 (최대 24시간 소요)

4. **앱 설정 확인**
   - **지원되는 계정 유형**이 "다중 테넌트"로 설정되어 있는지 확인
   - **리디렉션 URI**가 `https://login.microsoftonline.com/common/oauth2/nativeclient`로 설정되어 있는지 확인
   - **인증** 페이지에서 "모바일 및 데스크톱 애플리케이션" 플랫폼이 추가되어 있는지 확인

5. **로그인 시도**
   - 문서에 명시된 대로, 화이트리스트 요청 전에 최소 한 번은 로그인을 시도해야 합니다.
   - 이는 Microsoft가 앱의 활동을 확인하기 위한 필수 단계입니다.

참고: 모든 단계를 완료한 후에도 에러가 발생한다면, Microsoft의 승인 처리 시간(최대 24시간)을 기다려야 할 수 있습니다.

----

이제 런처를 통해 Microsoft로 인증할 수 있습니다.

참고 자료:
- https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
- https://help.minecraft.net/hc/en-us/articles/16254801392141
