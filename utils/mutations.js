import { useMutation, useQueryClient } from 'react-query';

export const tercihEt = async (params) => {
  const { id, userId, okulAdi, tercihSirasi } = params;
  const res = await fetch(`/api/school/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, okulAdi, tercihSirasi }),
  });
  const data = await res.json();
  if (!data.success) {
    alert(data.message);
  }
  return data;
};
export const tercihRemove = async (params) => {
  const { id, userId } = params;
  const res = await fetch(`/api/school/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  if (!data.success) {
    alert(data.message);
  }
  return data;
};
export const updateUser = async (params) => {
  const { values, email } = params;
  const res = await fetch(`/api/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, values }),
  });
  const data = await res.json();
  if (!data.success) {
    alert(data.message);
  }
  return data;
};

export const useAddSchoolToTercihs = () => {
  const queryClient = useQueryClient();
  return useMutation(tercihEt, {
    onSuccess: (_key, variables) => {
      queryClient.invalidateQueries(`school/${variables.id}`);
      queryClient.invalidateQueries('user');
    },
  });
};
export const useRemoveSchoolFromTercihs = () => {
  const queryClient = useQueryClient();
  return useMutation(tercihRemove, {
    onSuccess: (_key, variables) => {
      queryClient.invalidateQueries(`school/${variables.id}`);
      queryClient.invalidateQueries('user');
    },
  });
};
export const updateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: (_key, variables) => {
      queryClient.invalidateQueries('user');
    },
  });
};
