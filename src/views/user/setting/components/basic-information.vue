<template>
    <a-form
        ref="formRef"
        :model="formData"
        class="form"
        :label-col-props="{ span: 8 }"
        :wrapper-col-props="{ span: 16 }"
    >
        <a-form-item field="name" :rules="[{ required: true, message: '不能为空' }]" label="姓名">
            <a-input v-model="formData.name" />
        </a-form-item>
        <a-form-item field="email" label="邮箱"><a-input v-model="formData.email" /></a-form-item>
        <a-form-item field="job" label="职业"><a-input v-model="formData.job" /></a-form-item>
        <a-form-item field="organization" label="组织">
            <a-input v-model="formData.organization" />
        </a-form-item>
        <a-form-item field="location" label="地址"><a-input v-model="formData.location" /></a-form-item>
        <a-form-item field="introduction" label="介绍">
            <a-input v-model="formData.introduction" />
        </a-form-item>
        <a-form-item field="personal_website" label="个人网站">
            <a-input v-model="formData.personal_website" />
        </a-form-item>
        <a-form-item field="phone" label="手机号"><a-input v-model="formData.phone" /></a-form-item>
        <a-form-item>
            <a-space>
                <a-button type="primary" @click="validate" :loading="loading">
                    {{ $t('保存') }}
                </a-button>
                <a-button type="secondary" @click="reset">
                    {{ $t('重置') }}
                </a-button>
            </a-space>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { UserInfoCanModified, updateUserInfo } from '@/api/user';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import { msgError, msgSuccess } from '@/utils/msg';

const formRef = ref<FormInstance>();
const formData = ref<Partial<UserInfoCanModified>>({
    name: '',
    email: '',
    job: '',
    organization: '',
    location: '',
    introduction: '',
    personal_website: '',
    phone: '',
});
const { loading, setLoading } = useLoading();

formData.value.name = useUserStore().$state.name;
formData.value.email = useUserStore().$state.email;
formData.value.job = useUserStore().$state.job;
formData.value.organization = useUserStore().$state.organization;
formData.value.location = useUserStore().$state.location;
formData.value.introduction = useUserStore().$state.introduction;
formData.value.personal_website = useUserStore().$state.personalWebsite;
formData.value.phone = useUserStore().$state.phone;

const validate = async () => {
    if (loading.value) return;
    setLoading(true);
    const err = await formRef.value?.validate();
    if (!err) {
        const res = await updateUserInfo(formData.value);
        if (res.ok) {
            msgSuccess('保存成功');
            useUserStore().info();
        } else {
            msgError(res.msg);
        }
    }
    setLoading(false);
};

const reset = async () => {
    await formRef.value?.resetFields();
};
</script>

<style scoped lang="less">
.form {
    width: 540px;
    margin: 0 auto;
}
</style>
