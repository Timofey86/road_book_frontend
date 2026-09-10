import type {SupportedLanguage} from "../../../shared/i18n/types.ts";
import type {CurrentUser} from "../model/types.ts";
import {apiClient} from "../../../shared/api/apiClient.ts";

export async function updatePreferredLanguage(
    preferredLanguage: SupportedLanguage,
): Promise<CurrentUser> {
    const { data } = await apiClient.patch<CurrentUser>(
        '/users/me',
        { preferredLanguage },
    );

    return data;
}