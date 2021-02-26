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
  } else alert(data.message);
  return data;
};
export const yorumYap = async (params) => {
  const { userEmail, comment, okulAdi, id } = params;
  const res = await fetch(`/api/school/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail, okulAdi, comment, id }),
  });
  const data = await res.json();
  if (!data.success) {
    alert(data.message);
  }
  return data;
};
export const yorumSil = async (params) => {
  const { commentId, id } = params;
  const res = await fetch(`/api/school/${id}/comments`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commentId, id }),
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
export const commentOnMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(yorumYap, {
    onSuccess: (_key, variables) => {
      queryClient.invalidateQueries(`school/${variables.id}`);
    },
  });
};
export const deleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(yorumSil, {
    onSuccess: (_key, variables) => {
      queryClient.invalidateQueries(`school/${variables.id}`);
    },
  });
};
